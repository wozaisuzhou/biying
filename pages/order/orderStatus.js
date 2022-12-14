import {
  Steps,
  Divider,
  Button,
  Link
} from "react-daisyui";
import FooterPage from "../components/Footer";
import OrderStatusDetails from "../components/OrderStatusDetails";

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

export default function OrderStatus({ orderDetails }) {
  return (
    <>
      <div>
        <main>
          <Steps className="pt-5 gap-3 itemsCenter">
            <Steps.Step color="primary">下订单</Steps.Step>
            <Steps.Step color="primary">订单确认</Steps.Step>
            <Steps.Step color="primary">订单详情</Steps.Step>
            <Steps.Step>客户反馈</Steps.Step>
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
        <div className="pt-5 flex items-center justify-center">
        <Link href={`/order/orderCompletion?orderId=${orderDetails.orderId}`}>
          <Button variant="contained" color="success">
             走，去完成订单
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
