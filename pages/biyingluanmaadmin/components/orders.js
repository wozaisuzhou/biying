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
    const { orderId, name, title, description, cellphone, email, address, startTime, provinceName, cityName, ctime } = item;
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
      cityName.toLowerCase().includes(lowerCaseSearchQuery) ||
      ctime.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const columns = [
    {
      title: '订单 ID',
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
      title: '客户名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '手机',
      dataIndex: 'cellphone',
      key: 'cellphone',
    },
    {
      title: '下订单时间',
      dataIndex: 'ctime',
      key: 'ctime',
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
            <p>订单 ID: {selectedOrder.orderId}</p>
            <p>客户名字: {selectedOrder.name}</p>
            <p>服务要求: {selectedOrder.title}</p>
            <p>订单内容: {selectedOrder.description}</p>
            <p>地址: {selectedOrder.address}</p>
            <p>城市: {selectedOrder.cityName}</p>
            <p>省份: {selectedOrder.provinceName}</p>
            <p>服务开始时间: {selectedOrder.startTime}</p>
            <p>服务结束时间: {selectedOrder.endTime}</p>
            <p>预算: {selectedOrder.budget}</p>
            <p>手机: {selectedOrder.cellphone}</p>
            <p>邮箱: {selectedOrder.email}</p>
            <p>订单状态: {selectedOrder.statusVal}</p>
            {/* Display other order details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;