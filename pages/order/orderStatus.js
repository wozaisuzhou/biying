import {
    Steps,
    Divider,
    Form,
    Input,
    Textarea,
    Radio,
    Button,
  } from "react-daisyui";
import FooterPage from "../components/Footer";

export default function OrderStatus({}) {
  return (
    <>
      <div> 
         <main>
            <Steps className="pt-5 gap-3 itemsCenter">
              <Steps.Step color="primary">下订单</Steps.Step>
              <Steps.Step color="primary">订单确认</Steps.Step>
              <Steps.Step color="primary">订单状态</Steps.Step>
              <Steps.Step>客户反馈</Steps.Step>
            </Steps>
          </main>
          <Divider className="pt-10 pd-10">
                查看订单
          </Divider>
       
        <div className="absolute inset-x-0 bottom-0">  
         <FooterPage />
         </div>
      </div>
    </>
  );
}
