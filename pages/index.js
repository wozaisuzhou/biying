import Head from "next/head";
import styles from "../styles/Home.module.css";
import FooterPage from "./components/Footer";
import CategoryCard from "./components/CategoryCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>必应 - 生活 App</title>
        <meta
          name="description"
          content="Biying - life App can resolve all your problems!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="bg-indigo-100">
           <div className="h-100 max-w-100 rounded-100">
              <img src="beingindex.jpeg" />
           </div>
        </div> 
        <p className={styles.description}>竭诚为您提供最优质的服务</p>
        <div className="grid gap-10">
           <CategoryCard image="family.png" category="1" altMessage="安家服务" title="安家服务" services="服务覆盖：机场接送，租房服务，搬家服务，家具安装，手续办理，子女入学，驾驶培训，其他生活咨询" />
           <CategoryCard image="smart-city.png" category="2" altMessage="同城服务" title="同城服务" services="服务覆盖：同城代买, 同城送货, 翻译公证, 业务办理协助, 聚会筹划, 其他同城跑腿" />
           <CategoryCard image="travel-bag.png" category="3" altMessage="旅游向导" title="旅游向导" services="服务覆盖：旅游规划，机票服务，个人向导，司机服务" />
           <CategoryCard image="grocery.png" category="4" altMessage="居家服务" title="居家服务" services="服务覆盖：家政服务，月嫂服务，买菜烧饭" />
           <CategoryCard image="stock.png" category="5" altMessage="保险理财" title="保险理财" services="服务覆盖：会计服务，保险业务（汽车， 房屋， 人寿等)，贷款业务, 房地产管理及投资" />
           <CategoryCard image="tools.png" category="6" altMessage="维修保养" title="维修保养" services="服务覆盖：电工服务，水暖工, 屋顶维护, 泳池维护, 地毯清洗, 空调维修, 汽车维修, 汽车保养, 装修工, 园艺" />
        </div>
      </main>

     <FooterPage />
    </div>
  );
}
