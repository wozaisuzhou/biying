import React, { useState } from 'react';
import { Table, Input, Modal } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const Orders = ({ orders, provinces, cities }) => {

  if (!orders) {
    return null; // or render a loading state or placeholder
  }
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const getProvinceName = (provinceId) => {
    const provinceData = provinces.find((item) => item.id === provinceId);
    return provinceData ? provinceData.fullName : '';
  };

  const getCityName = (cityId) => {
    const cityData = cities.find((item) => item.id === cityId);
    return cityData ? cityData.fullName : '';
  };

  const getOrderStatus = (status) => {
    return status ? '处理中' : '处理完';
  };

  const modifiedData = orders.map((item) => ({
    ...item,
    provinceName: getProvinceName(item.provinceId),
    cityName: getCityName(item.cityId),
    statusVal: getOrderStatus(item.status),
  }));

  const filteredData = modifiedData.filter((item) => {
    const { orderId, name, title, description, cellphone, email, address, startTime, provinceName, cityName } = item;
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      orderId.toLowerCase().includes(lowerCaseSearchQuery) ||
      name.toLowerCase().includes(lowerCaseSearchQuery) ||
      title.toLowerCase().includes(lowerCaseSearchQuery) ||
      description.toLowerCase().includes(lowerCaseSearchQuery) ||
      cellphone.toLowerCase().includes(lowerCaseSearchQuery) ||
      email.toLowerCase().includes(lowerCaseSearchQuery) ||
      address.toLowerCase().includes(lowerCaseSearchQuery) ||
      startTime.toLowerCase().includes(lowerCaseSearchQuery) ||
      provinceName.toLowerCase().includes(lowerCaseSearchQuery) ||
      cityName.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text, record) => (
        <Text
          strong
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => handleOrderClick(record)}
        >
          {text}
        </Text>
      ),
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Cell',
      dataIndex: 'cellphone',
      key: 'cellphone',
    },
    // Rest of the columns...
  ];

  return (
    <div>
      <Input.Search
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />

      <Table dataSource={filteredData} columns={columns} rowKey="orderId" pagination={false} />

      <Modal
        visible={modalVisible}
        title="Order Details"
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>Order ID: {selectedOrder.orderId}</p>
            <p>Customer Name: {selectedOrder.name}</p>
            <p>Service requirement: {selectedOrder.title}</p>
            <p>Order description: {selectedOrder.description}</p>
            <p>Address: {selectedOrder.address}</p>
            <p>City: {selectedOrder.cityName}</p>
            <p>Province: {selectedOrder.provinceName}</p>
            <p>StartTime: {selectedOrder.startTime}</p>
            <p>EndTime: {selectedOrder.endTime}</p>
            <p>Budget: {selectedOrder.budget}</p>
            <p>Cell: {selectedOrder.cellphone}</p>
            <p>Email: {selectedOrder.email}</p>
            <p>Status: {selectedOrder.statusVal}</p>
            {/* Display other order details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;