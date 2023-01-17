import styles from "../../styles/Home.module.css";
import { Steps, Divider, Input, Link } from "react-daisyui";
import orderStatus from "../../components/orderStatusEnum";
import Image from 'next/image'

const OrderSuccess = (props) => {
  const statusCode = props.orderStatus;
  const statusMessage = orderStatus[statusCode];

  return (
    <>
      <div className="pt-10 flex items-center justify-center">
        <Image
          src={"/success.png"}
          alt="订单提交成功！"
          width={85}
          height={85}
        />
      </div>
      <p className="pt-5 text-red-500 flex items-center justify-center">
        {props.name}, 您的订单已经成功， 感谢您的信任！
      </p>
      <p className="pt-5 pb-10 text-red-500 flex items-center justify-center">
        相关服务人员也会尽快为您服务
      </p>
      <div className="grid grid-rows-8 gap-4 flex w-full component-preview p-4 items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          <div>您的订单号：</div>
          <div>{props.orderId}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>您的订单状态：</div>
          <div>{statusMessage}</div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
