import { useState } from 'react';
import { Layout, Menu } from 'antd';
import Orders from './components/orders';
import SPS from './components/sps';
import fs from 'fs';
import https from 'https';

const { Sider, Content } = Layout;

export async function getServerSideProps() {
  const certValue = await fs.readFileSync("../server/ssl/cert.pem");
  const keyValue = await fs.readFileSync("../server/ssl/key.pem");

  const httpOptions = {
    cert: certValue,
    key: keyValue,
    rejectUnauthorized: false,
  };

 const sslConfiguredAgent = new https.Agent(httpOptions);

  // Fetch data from an API or perform any data fetching logic
  const [allOrdersDataRes, allProvidersDataRes, allProvincesDataRes, allCitiesDataRes, allEducationsDataRes] =
    await Promise.all([
      fetch(process.env.getAllOrdersUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.getAllProvidersUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.allProvincesApiUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.allCitiesApiUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
      fetch(process.env.getAllEducationUrl, {
        headers: {
          Accept: "application/json",
        },
        agent: sslConfiguredAgent,
      }),
    ]);

  //order data
    const ordersResData = await allOrdersDataRes.json();
    const ordersData = await ordersResData.data;
  
  //provider data
    const allProvidersData = await allProvidersDataRes.json();
    const providersData = await allProvidersData.data;

    const combinedProvidersData = providersData.reduce((accumulator, item) => {
      const providerId = item.providerId;
      const existingItemIndex = accumulator.findIndex(
        accItem => accItem.providerId === providerId
      );
  
      if (existingItemIndex !== -1) {
        // If the providerId already exists in the accumulator, combine the titles
        accumulator[existingItemIndex].title += `, ${item.title}`;
      } else {
        // If the providerId does not exist, add a new item to the accumulator
        accumulator.push({ ...item });
      }
  
      return accumulator;
    }, []);
   
  //Provinces data 
    const provincesResData = await allProvincesDataRes.json();
    const provincesData = await provincesResData.data;

  //Cities data
    const allCitiesResData = await allCitiesDataRes.json();
    const citiesData = await allCitiesResData.data;

  //Cities data
    const allEducationsData = await allEducationsDataRes.json();
    const educationsData = await allEducationsData.data;
      
  
  return {
    props: {
      ordersData,
      combinedProvidersData,
      provincesData,
      citiesData,
      educationsData
    },
  };
}

const Dashboard = ({ ordersData, combinedProvidersData, provincesData, citiesData, educationsData }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('orders');

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  let contentComponent = null;

  switch (selectedMenuItem) {
    case 'orders':
      contentComponent = <Orders orders={ordersData} provinces={provincesData} cities={citiesData} />;
      break;
    case 'sps':
      contentComponent = <SPS providers={combinedProvidersData} provinces={provincesData} cities={citiesData} educations={educationsData}/>;
      break;
    default:
     break;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="orders">Orders</Menu.Item>
          <Menu.Item key="sps">Service providers</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {contentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;