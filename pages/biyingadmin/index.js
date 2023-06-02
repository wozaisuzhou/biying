import { useState } from 'react';
import { Layout, Menu } from 'antd';
import Orders from './components/orders';

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
  const [allOrdersDataRes, allProvincesDataRes, allCitiesDataRes] =
    await Promise.all([
      fetch(process.env.getAllOrdersUrl, {
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
    ]);


  //Orders data
    const ordersResData = await allOrdersDataRes.json();
    const ordersData = await ordersResData.data;
   
  //Provinces data 
    const provincesResData = await allProvincesDataRes.json();
    const provincesData = await provincesResData.data;

  //Cities data
    const allCitiesResData = await allCitiesDataRes.json();
    const citiesData = await allCitiesResData.data;  
  
  return {
    props: {
      ordersData,
      provincesData,
      citiesData
    },
  };
}

const Dashboard = ({ ordersData, provincesData, citiesData }) => {
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
      contentComponent = <UsersContent />;
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

const UsersContent = () => (
  <div>
    <h1>Users</h1>
    <p>This is the users content.</p>
  </div>
);

export default Dashboard;