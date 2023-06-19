import React, { useState } from 'react';
import { Table, Input, Modal } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const SPS = ({ providers, provinces, cities, educations }) => {

  if (!providers) {
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

  const getEducationName = (educationId) => {
    const educationData = educations.find((item) => item.id === educationId);
    return educationData ? educationData.info : '';
  };

  const modifiedData = providers.map((item) => ({
    ...item,
    provinceName: getProvinceName(item.provinceId),
    cityName: getCityName(item.cityId),
    educationName: getEducationName(item.educationId),
  }));

  modifiedData.map((item) => {
    console.log("this is the provider data " + item.providerId);
  })

  const filteredData = modifiedData.filter((item) => {
    const { firstName, lastName, email, cellphone, wechat, postCode, selfIntro, title, provinceName, cityName, educationName } = item;
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      firstName.toLowerCase().includes(lowerCaseSearchQuery) ||
      lastName.toLowerCase().includes(lowerCaseSearchQuery) ||
      email.toLowerCase().includes(lowerCaseSearchQuery) ||
      cellphone.toLowerCase().includes(lowerCaseSearchQuery) ||
      wechat.toLowerCase().includes(lowerCaseSearchQuery) ||
      postCode.toLowerCase().includes(lowerCaseSearchQuery) ||
      selfIntro.toLowerCase().includes(lowerCaseSearchQuery) ||
      title.toLowerCase().includes(lowerCaseSearchQuery) ||
      provinceName.toLowerCase().includes(lowerCaseSearchQuery) ||
      cityName.toLowerCase().includes(lowerCaseSearchQuery) ||
      educationName.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const columns = [
    {
      title: 'Provider ID',
      dataIndex: 'providerId',
      key: 'providerId',
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
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

      <Table dataSource={filteredData} columns={columns} rowKey="providerId" pagination={false} />

      <Modal
        visible={modalVisible}
        title="Provider Details"
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>Provider ID: {selectedOrder.providerId}</p>
            <p>First Name: {selectedOrder.firstName}</p>
            <p>Last Name: {selectedOrder.lastName}</p>
            <p>Address: {selectedOrder.address}</p>
            <p>City: {selectedOrder.cityName}</p>
            <p>Province: {selectedOrder.provinceName}</p>
            <p>Year Served: {selectedOrder.yearsServed}</p>
            <p>Wechat: {selectedOrder.wechat}</p>
            <p>Post Code: {selectedOrder.postCode}</p>
            <p>Cell: {selectedOrder.cellphone}</p>
            <p>Email: {selectedOrder.email}</p>
            <p>Self Intro: {selectedOrder.selfIntro}</p>
            <p>Service: {selectedOrder.title}</p>
            {/* Display other order details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SPS;