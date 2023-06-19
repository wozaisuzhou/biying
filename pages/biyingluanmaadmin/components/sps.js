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
      title: '服务者 ID',
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
      title: '名',
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: '姓',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机',
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
            <p>服务者 ID: {selectedOrder.providerId}</p>
            <p>名: {selectedOrder.firstName}</p>
            <p>姓: {selectedOrder.lastName}</p>
            <p>地址: {selectedOrder.address}</p>
            <p>城市: {selectedOrder.cityName}</p>
            <p>省份: {selectedOrder.provinceName}</p>
            <p>服务年限: {selectedOrder.yearsServed}</p>
            <p>微信: {selectedOrder.wechat}</p>
            <p>邮编: {selectedOrder.postCode}</p>
            <p>手机: {selectedOrder.cellphone}</p>
            <p>邮箱: {selectedOrder.email}</p>
            <p>自我介绍: {selectedOrder.selfIntro}</p>
            <p>服务内容: {selectedOrder.title}</p>
            {/* Display other order details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SPS;