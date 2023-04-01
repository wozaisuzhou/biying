import Head from "next/head";
import {
  Divider,
  Form,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "react-daisyui";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import FooterPage from "../components/Footer";
import { useForm, Controller, register } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../../components/validation/registrationSchema";
import axios from "axios";
import fs from 'fs';
import https from 'https';

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  // Fetch data from external API

  const certValue = await fs.readFileSync('../server/ssl/cert.pem');
  const keyValue = await fs.readFileSync('../server/ssl/key.pem');
  
  const sslConfiguredAgent = await new https.Agent({
    cert: certValue,
    key: keyValue,
    rejectUnauthorized: false,
  });

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
  return { props: { allCategories, allProvinces, allCities} };
}

export default function ServiceProviderRegistration({
  allCategories,
  allProvinces,
  allCities
}) {
  const router = useRouter();

  const [categoriesArr, setCategories] = useState([]);

  const addCategoryId = (categoryId) => {
    setCategories([...categoriesArr, categoryId]);
  };

  const removeCategoryId = (categoryId) => {
    const index = categoriesArr.indexOf(categoryId);
    categoriesArr.splice(index, 1);
    setCategories(categoriesArr);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categories: [],
    },
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    let categories = categoriesArr.join(",");
    data.categories = categories;
    console.log(JSON.stringify(data));

    try {
      axios
        .post(process.env.insertServiceProviderUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
          httpsAgent: sslConfiguredAgent,
        })
        .then((response) => {
          console.log("the response is " + response.status);
          if (response.data.status === "success") {
            router.push({
              pathname: "/sp/registrationConfirmation",
            });
          }
        })
        .catch((err) => {
          router.push({
            pathname: "/sp/error",
          });
        });
    } catch (err) {
       reject(err);
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>必应 - 生活 App</title>
          <meta
            name="description"
             http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="bg-indigo-100">
           <div className="h-100 max-w-100 rounded-100">
              <img src="../beingindex.jpeg" />
           </div>
          </div> 
          <div className="flex w-full items-center justify-center pt-5">
            <h2 className={styles.subTitle}>Service provider 申请表</h2>
          </div>
          <Divider></Divider>

          <Form id="spRegistration" onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-2">
              <label className="label">
                <span className="label-text">姓 (Last name)：</span>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
              <p className="pt-2 text-red-400">{errors.lastName?.message}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">名 (First Name)：</span>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
              <p className="pt-2 text-red-400">{errors.firstName?.message}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">电子邮件 (Email)：</span>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <label className="label">
                <span className="label-text">手机 (Cell Phone): </span>
                <Controller
                  control={control}
                  name="cellphone"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
              <p className="pt-2 text-red-400">{errors.cellphone?.message}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">微信 (Wechat): </span>
                <Controller
                  control={control}
                  name="wechat"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
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
            <div className="pt-2 pb-2">
              <label className="label">
                <span className="label-text"> 地址(address): </span>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <Textarea
                      type="textarea"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
              <p className="pt-2 text-red-400">{errors.address?.message}</p>
            </div>
            <div className="pt-2 pb-2">
              <label className="label">
                <span className="label-text"> 邮编(Postal code): </span>
                <Controller
                  control={control}
                  name="postCode"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder=""
                      className="w-100 input input-bordered"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </label>
              <p className="pt-2 text-red-400">{errors.postCode?.message}</p>
            </div>
            <div className="pt-2 pl-2 pb-2">
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
            <div className="pt-2 pl-2 pb-5">
              <label className="label">
                <span className="label-text">专业认证：</span>
              </label>
              <Controller
                name="educationId"
                control={control}
                render={({ field }) => (
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(value) => field.onChange(value)}
                  >
                    <option value="0" defaultValue>
                      请选择您的专业认证
                    </option>
                    <option value="1">大学</option>
                    <option value="2">专业证书</option>
                    <option value="3">研究生</option>
                  </select>
                )}
              />
              <p className="pt-2 text-red-400">{errors.educationId?.message}</p>
            </div>
            <div className="pl-2 pt-2 pb-2">
              <label className="label">
                <span className="label-text">从业年龄(Years served): </span>
              </label>
              <Controller
                control={control}
                name="yearsServed"
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder=""
                    className="input-bordered"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />{" "}
              年
            </div>

            <div className="pl-2 pt-2 pb-2 pr-5">
              <label className="label">
                <span className="label-text"> 自我介绍(Self intro): </span>
              </label>
              <Controller
                control={control}
                name="selfIntro"
                render={({ field }) => (
                  <Textarea
                    type="textarea"
                    placeholder=""
                    className="w-full pr-10 input-bordered"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <p className="pt-2 text-red-400">{errors.selfIntro?.message}</p>
            </div>

            <div className="collapse collapse-arrow pb-2 pr-10">
              <input type="checkbox" />
              <div className="collapse-title text-l font-medium">
                请选择您愿意提供的服务
              </div>

              <div className="collapse-content">
                {allCategories.map((subCategory, index) => {
                  const subCategoryTitles = JSON.parse(subCategory.title);
                  return (
                    <label key={index} className="cursor-pointer label">
                      <span className="label-text">{subCategoryTitles.zh}</span>
                      <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            name="categories"
                            color="primary"
                            value={subCategory.id}
                            onChange={(e) => 
                                e.target.checked? 
                                  field.onChange(addCategoryId(e.target.value)) :
                                  field.onChange(removeCategoryId(e.target.value))
                            }
                     
                          />
                        )}
                      />
                    </label>
                  );
                })}
              </div>
              <p className="pl-2 pt-2 text-red-400">
                {errors.categories?.message}
              </p>
            </div>
            <div className="pt-5 pl-10 pb-10 form-control w-full max-w-xs">
              <Button form="spRegistration" type="submit" color="primary">
                提交
              </Button>
            </div>
          </Form>
          <div>
            <FooterPage />
          </div>
        </div>
      </div>
    </>
  );
}
