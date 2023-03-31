import Head from "next/head";
import {
  Divider,
} from "react-daisyui";
import styles from "../../styles/Home.module.css";

import FooterPage from "../components/Footer";

export default function ServiceProviderRegistrationConfirmation() {
  
  return (
    <>
      <div>
        <Head>
          <title>必应 - 生活 App</title>
          <meta
            name="description"
            http-equiv="Content-Security-Policy" 
            content="upgrade-insecure-requests"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="flex w-full items-center justify-center pt-20">
            <h1 className={styles.title}>必应 - 生活</h1>
          </div>
          <Divider></Divider>
          <div className="flex w-full items-center justify-center pt-5">
            <h2>注册成功！</h2>
          </div>
          <div className="flex w-full items-center justify-center pt-5">
            <h2>我们的工作人员会尽快和您联络！</h2>
          </div>
          <div className="flex flex-col p-5 w-full h-screen">
            <FooterPage />
          </div>
        </div>
      </div>
    </>
  );
}
