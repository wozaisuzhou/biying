import {
  Steps,
  Divider,
  Form,
  Input,
  Textarea,
  Radio,
  Button,
  Checkbox,
} from "react-daisyui";
import { useRouter } from "next/router";
import FooterPage from "../components/Footer";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { orderSchema } from "../../components/validation/orderSchema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import fs from 'fs';
import https from 'https';

const serviceNameEnum = {
  1: "安家服务",
  2: "同城服务",
  3: "旅游向导",
  4: "居家服务",
  5: "保险理财",
  6: "维修保养",
};

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  // Fetch data from external API

  const httpOptions = {
    cert: fs.readFileSync('../server/ssl/cert.pem'),
    key: fs.readFileSync('../server/ssl/key.pem'),
    rejectUnauthorized: false,
  }
  
  const sslConfiguredAgent = new https.Agent(httpOptions);
  
  const [allCategoriesResponse, allProvinceResponse, allCitiesResponse] =
    await Promise.all([
      fetch(process.env.allCategoriesApiUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.allProvincesApiUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.allCitiesApiUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
    ]);

  const [categoriesData, allProvinceData, allCitiesData] = await Promise.all([
    allCategoriesResponse.json(),
    allProvinceResponse.json(),
    allCitiesResponse.json(),
  ]);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  const allCategories = categoriesData.data;
  const allProvinces = allProvinceData.data;
  const allCities = allCitiesData.data;

  // Pass data to the page via props
  return { props: { allCategories, allProvinces, allCities, httpOptions} };
}

export default function CategoryOrderForm({
  allCategories,
  allProvinces,
  allCities,
  httpOptions
}) {
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();
  const categoryId = router.query.category;
  const subCategories = allCategories.filter(function (subCategory) {
    return subCategory.parentId == categoryId;
  });

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: new Date(),
    },
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = (data) => {

    let dataDate = formatDate(data.startTime);
    data.startTime = dataDate;

    try {
      axios
        .post("/api/order", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if(response.data.status === 'success') {
            router.push({
              pathname:"/order/orderConfirmation",
              query: { orderId: response.data.result.orderId },
            });
          }
        })
        .catch((err) => {
        });
    } catch (err) {
        reject(err);
    }
  };

  return (
    <>
      <div>
        <div className="itemsCenter">
          <main>
            <Steps className="pt-5 gap-3 itemsCenter">
              <Steps.Step color="primary">下订单</Steps.Step>
              <Steps.Step>订单确认</Steps.Step>
              <Steps.Step>订单详情</Steps.Step>
            </Steps>
          </main>
          <Divider className="pt-10 pd-10">
            {serviceNameEnum[categoryId]} - 下订单
          </Divider>
          <div>
            <Form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
              <div>
                {subCategories.map((subCategory, index) => {
                  const subCategoryTitles = JSON.parse(subCategory.title);
                  return (
                    <label key={index} className="cursor-pointer label">
                      <span className="label-text">{subCategoryTitles.zh}</span>
                      <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => (
                          <Radio
                            name="categoryId"
                            color="primary"
                            value={subCategory.id}
                            onChange={(value) => field.onChange(value)}
                          />
                        )}
                      />
                    </label>
                  );
                })}
                <p className="pt-2 text-red-400">{errors.categoryId?.message}</p>
              </div>
              <div className="pt-10 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">您的具体要求： </span>
                </label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Type here"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <p className="pt-2 text-red-400">{errors.description?.message}</p>
              </div>
              <div className="pt-2 pl-2 form-control w-120">
                <label className="label">
                  <span className="label-text">请选择服务时间：</span>
                </label>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <DatePicker
                      showTimeSelect
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      filterTime={filterPassedTime}
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
              <div className="pt-5 pl-2">
                <label className="label">
                  <span className="label-text">服务时长：</span>
                </label>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-20 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value)}}
                    />
                  )}
                />
                &nbsp;&nbsp;小时
              </div>
              <div className="pt-2 pl-2">
                <label className="label">
                  <span className="label-text">服务语言：</span>
                </label>
                <Controller
                  name="lang"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    >
                      <option value="0" defaultValue>
                        请选择您的语言
                      </option>
                      <option value="1">普通话</option>
                      <option value="2">粤语</option>
                      <option value="3">英语</option>
                    </select>
                  )}
                />
              </div>
              <div className="pt-2 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">您的姓名</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <p className="pt-2 text-red-400">{errors.name?.message}</p>
              </div>
              <div className="pt-2 pl-2">
                <label className="label">
                  <span className="label-text">省份：</span>
                </label>
                <Controller
                  name="provinceId"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    >
                      <option value="0" defaultValue>
                        请选择您所在的省份
                      </option>
                      {allProvinces.map((province, index) => (
                        <option key={index} value={province.id}>
                          {province.fullName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <p className="pt-2 text-red-400">{errors.provinceId?.message}</p>
              </div>
              <div className="pt-2 pl-2">
                <label className="label">
                  <span className="label-text">城市：</span>
                </label>
                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    >
                      <option value="0" defaultValue>
                        请选择您所在的城市
                      </option>
                      {allCities.map((city, index) => (
                        <option key={index} value={city.id}>
                          {city.fullName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                 <p className="pt-2 text-red-400">{errors.cityId?.message}</p>
              </div>
              <div className="pt-2 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">地址:</span>
                </label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <p className="pt-2 text-red-400">{errors.address?.message}</p>
              </div>
              <div className="pt-2 pl-2 w-80 max-w-xs">
                <label className="label">
                  <span className="label-text">预算:</span>
                </label>

                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      onChange={(value) => {field.onChange(value)}}
                    />
                  )}
                /> &nbsp;&nbsp; 加币
                 <p className="pt-2 text-red-400">{errors.budget?.message}</p>
              </div>
              <div className="pt-2 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">您的E-mail</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                 <p className="pt-2 text-red-400">{errors.email?.message}</p>
              </div>
              <div className="pt-2 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">您的WeChat</span>
                </label>
                <Controller
                  name="wechat"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="pt-2 pl-2 form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">您的电话</span>
                </label>
                <Controller
                  name="cellphone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <p className="pt-2 text-red-400">{errors.cellphone?.message}</p>
              </div>
              <div>
              <label class="cursor-pointer label">
              <Controller
                        name="privacy"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            name="privacy"
                            color="primary"
                            onChange={(e) =>
                              e.target.checked? field.onChange(true):field.onChange(false) 
                            }
                          />
                        )}
                      />
                <span class="pl-2 label-text font-bold">I agree to the <a href="../../GlobalTerms.html"><span class="text-blue-600">Terms and Conditions</span></a> and have reviewed the <a href="../../GlobalPrivacy.html"><span class="text-blue-600">Privacy Policy.</span></a></span>
              </label>
              <p className="pl-2 pt-2 text-red-400">
                {errors.privacy?.message}
              </p>
            </div>
              <div className="pt-5 pl-10 pb-10 form-control w-full max-w-xs">
                <Button form="orderForm" type="submit" color="primary">
                  确定下单
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <FooterPage />
      </div>
    </>
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(":")
  );
}
