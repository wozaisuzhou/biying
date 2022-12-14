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
import { registrationSchema } from "./validation/registrationSchema";
import axios from "axios";

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  // Fetch data from external API
  const [allCategoriesResponse, allProvinceResponse, allCitiesResponse] =
    await Promise.all([
      fetch(process.env.allCategoriesApiUrl, {
        headers: {
          Accept: "application/json",
        },
      }),
      fetch(process.env.allProvincesApiUrl, {
        headers: {
          Accept: "application/json",
        },
      }),
      fetch(process.env.allCitiesApiUrl, {
        headers: {
          Accept: "application/json",
        },
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
  return { props: { allCategories, allProvinces, allCities } };
}

export default function ServiceProviderRegistration({
  allCategories,
  allProvinces,
  allCities,
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
          <title>?????? - ?????? App</title>
          <meta
            name="description"
            content="Biying - life App can resolve all your problems!"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="flex w-full items-center justify-center pt-20">
            <h1 className={styles.title}>?????? - ??????</h1>
          </div>
          <div className="flex w-full items-center justify-center pt-5">
            <h2 className={styles.subTitle}>Service provider ?????????</h2>
          </div>
          <Divider></Divider>

          <Form id="spRegistration" onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-2">
              <label className="label">
                <span className="label-text">??? (Last name)???</span>
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
                <span className="label-text">??? (First Name)???</span>
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
                <span className="label-text">???????????? (Email)???</span>
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
                <span className="label-text">?????? (Cell Phone): </span>
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
                <span className="label-text">?????? (Wechat): </span>
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
                <span className="label-text">?????????</span>
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
                      ???????????????????????????
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
                <span className="label-text">?????????</span>
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
                      ???????????????????????????
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
                <span className="label-text"> ??????(address): </span>
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
                <span className="label-text"> ??????(Postal code): </span>
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
                <span className="label-text">???????????????</span>
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
                      ?????????????????????
                    </option>
                    <option value="1">?????????</option>
                    <option value="2">??????</option>
                    <option value="3">??????</option>
                  </select>
                )}
              />
            </div>
            <div className="pt-2 pl-2 pb-5">
              <label className="label">
                <span className="label-text">???????????????</span>
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
                      ???????????????????????????
                    </option>
                    <option value="1">??????</option>
                    <option value="2">????????????</option>
                    <option value="3">?????????</option>
                  </select>
                )}
              />
              <p className="pt-2 text-red-400">{errors.educationId?.message}</p>
            </div>
            <div className="pl-2 pt-2 pb-2">
              <label className="label">
                <span className="label-text">????????????(Years served): </span>
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
              ???
            </div>

            <div className="pl-2 pt-2 pb-2">
              <label className="label">
                <span className="label-text"> ????????????(Self intro): </span>
              </label>
              <Controller
                control={control}
                name="selfIntro"
                render={({ field }) => (
                  <Textarea
                    type="textarea"
                    placeholder=""
                    className="resize-x input-bordered"
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <p className="pt-2 text-red-400">{errors.selfIntro?.message}</p>
            </div>

            <div className="collapse collapse-arrow pb-2">
              <input type="checkbox" />
              <div className="collapse-title text-l font-medium">
                ?????????????????????????????????
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
                ??????
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
