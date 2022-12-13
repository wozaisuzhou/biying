import styles from "../../styles/Home.module.css";
import { Steps, Divider, Input, Link } from "react-daisyui";
import orderStatus from '../order/orderStatusEnum';
import Image from 'next/image'

const OrderFailed = (props) => {
   const statusCode = props.orderStatus;
   const statusMessage = orderStatus[statusCode];

  return (
    <>
     <div className="pt-10 flex items-center justify-center">
        <Image
          src={"/delete.png"}
          alt="订单提交失败！"
          width={85}
          height={85}
        />
      </div>
      <p className="pt-5 text-red-500 flex items-center justify-center">
        {props.name}, 您的订单没有成功提交， 请重新下订单！
      </p>
      <div className="pt-5 flex items-center justify-center">
        <Link href="/" >
          <Button variant="contained" color="warning">
             重新下一单
          </Button>
        </Link>
        </div>
    </>
  );
};

export default OrderFailed;
