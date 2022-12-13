import { Steps, Divider, Button, Rating } from "react-daisyui";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FooterPage from "../components/Footer";

export default function OrderCompletion() {
  const router = useRouter();
  const orderId = router.query.orderId;
  const [rating, setRating] = useState(1);


  return (
    <>
      <div>
        <main>
          <Steps className="pt-5 gap-3 itemsCenter">
            <Steps.Step color="primary">下订单</Steps.Step>
            <Steps.Step color="primary">订单确认</Steps.Step>
            <Steps.Step color="primary">订单详情</Steps.Step>
            <Steps.Step color="primary">客户反馈</Steps.Step>
          </Steps>
        </main>
        <Divider className="pt-10 pd-10">订单完成</Divider>
        <div className="pt-5 flex items-center justify-center">
          <form>
            <div className="grid grid-cols-2 gap-4 flex w-full component-preview p-4 items-center justify-center">
              <div>您的订单号：</div>
              <div>{orderId}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 flex w-full component-preview p-4 items-center justify-center">
              <div>请您给服务打分：</div>

              <div>
                <Rating  value={rating} onChange={(value)=> setRating(value)}>
                  <Rating.Item
                    name="rating-10"
                    value="1"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                  />

                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                  />

                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                  />

                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                  />
                  <Rating.Item
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                  />
                </Rating>
              </div>
            </div>
            <div className="flex w-full component-preview p-4 items-center justify-center">
              <Button variant="contained" color="success" type="submit">
                结账
              </Button>
            </div>
          </form>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <FooterPage />
        </div>
      </div>
    </>
  );
}
