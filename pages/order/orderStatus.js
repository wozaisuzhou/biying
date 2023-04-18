import {
  Steps,
  Divider,
  Button,
  Link
} from "react-daisyui";
import FooterPage from "../components/Footer";
import OrderStatusDetails from "../components/OrderStatusDetails";
import fs from 'fs';
import https from 'https';

export async function getServerSideProps(context) {
  const { orderId } = context.query;
   
  const httpOptions = {
    cert: fs.readFileSync('../server/ssl/cert.pem'),
    key: fs.readFileSync('../server/ssl/key.pem'),
    rejectUnauthorized: false,
  }
  
  const sslConfiguredAgent = new https.Agent(httpOptions);

  const res = await fetch((process.env.getOrderDetailsApiUrl + orderId), {
    headers: {
      Accept: "application/json",
    },
    agent: sslConfiguredAgent,
  });

  const orderDetailsData = await res.json();
  let orderDetails;

  if (orderDetailsData) {
    const orderDetailsArray = orderDetailsData.data;
    orderDetails = orderDetailsArray[0];
  }

  return { props: { orderDetails } };
}

export default function OrderStatus({ orderDetails }) {
  return (
    <>
      <div>
        <main>
          <Steps className="pt-5 gap-3 itemsCenter">
            <Steps.Step color="primary">下订单</Steps.Step>
            <Steps.Step color="primary">订单确认</Steps.Step>
            <Steps.Step color="primary">订单详情</Steps.Step>
          </Steps>
        </main>
        <Divider className="pt-10 pd-10">订单详情</Divider>
        <div className="pt-10">
          <OrderStatusDetails
            orderId={orderDetails.orderId}
            orderStatus={orderDetails.status}
            provider={orderDetails.provider}
            description={orderDetails.description}
            budget={orderDetails.budget}
          />
        </div>
        <div className="pt-10">
        <p class="text-red-600">请妥善保存订单信息</p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <FooterPage />
        </div>
      </div>
    </>
  );
}
