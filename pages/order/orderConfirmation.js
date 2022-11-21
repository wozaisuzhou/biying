import { Steps, Divider, Link } from "react-daisyui";
import FooterPage from "../components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
    const { orderId } = context.query;
    console.log("this is api " + orderId);
    const res = await fetch(process.env.getOrderDetailsApiUrl + orderId);
    
    const orderDetailsData = await res.json();
    let orderDetails;

    if(orderDetailsData) {
      const orderDetailsArray = orderDetailsData.data;
      orderDetails = orderDetailsArray[0];
    }
  
    console.log("order detail is " + orderDetails.name);
    return { props: { orderDetails } };
  }



export default function OrderConfirmation({ orderDetails }) {

  return (
    <>
      <div>
        <main>
          <Steps className="pt-5 gap-3 itemsCenter">
            <Steps.Step color="primary">下订单</Steps.Step>
            <Steps.Step color="primary">订单确认</Steps.Step>
            <Steps.Step>订单状态</Steps.Step>
            <Steps.Step>客户反馈</Steps.Step>
          </Steps>
        </main>
        <Divider className="pt-10 pd-10">订单提交完成</Divider>
        {}
        <div className="absolute inset-x-0 bottom-0">
          <FooterPage />
        </div>
      </div>
    </>
  );
}
