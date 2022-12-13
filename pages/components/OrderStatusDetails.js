import styles from "../../styles/Home.module.css";
import { Steps, Divider, Input, Link } from "react-daisyui";
import orderStatus from "../order/orderStatusEnum";
import Image from "next/image";

const OrderStatusDetails = (props) => {
  const statusCode = props.orderStatus;
  const statusMessage = orderStatus[statusCode];
  let provider = props.provider;
  if(typeof provider === 'string' && provider.length === 0){
    provider = "未指派";
  }

  return (
    <>
      <div className="grid grid-rows-8 gap-4 flex w-full component-preview p-4 items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          <div>您的订单号：</div>
          <div>{props.orderId}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>您的订单状态：</div>
          <div>{statusMessage}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>服务商：</div>
          <div>{provider}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>订单内容：</div>
          <div className="break-all ...">{props.description}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>预算：</div>
          <div>{props.budget} 加币</div>
        </div>
      </div>
    </>
  );
};

export default OrderStatusDetails;
