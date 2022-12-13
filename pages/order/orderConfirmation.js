import { Steps, Divider, Link, Button } from "react-daisyui";
import FooterPage from "../components/Footer";
import OrderSuccess from "../components/OrderSuccess";

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  const res = await fetch(process.env.getOrderDetailsApiUrl + orderId);

  const orderDetailsData = await res.json();
  let orderDetails;

  if (orderDetailsData) {
    const orderDetailsArray = orderDetailsData.data;
    orderDetails = orderDetailsArray[0];
  }

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
            <Steps.Step>订单详情</Steps.Step>
            <Steps.Step>客户反馈</Steps.Step>
          </Steps>
        </main>
        {orderDetails ? (
          <OrderSuccess
            name={orderDetails.name}
            orderId={orderDetails.orderId}
            orderStatus={orderDetails.status}
          />
        ) : (
          <OrderFailed name={orderDetails.name} />
        )}
        <div className="pt-5 flex items-center justify-center">
        <Link href={`/order/orderStatus?orderId=${orderDetails.orderId}`}>
          <Button variant="contained" color="success">
             查看订单详情
          </Button>
        </Link>
        </div>
       <div className="pt-20 flex items-center justify-center">
        <Link href="/" >
          <Button variant="contained" color="warning">
             再去下一单
          </Button>
        </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <FooterPage />
        </div>
      </div>
    </>
  );
}
