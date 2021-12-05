/* eslint-disable no-template-curly-in-string */
import React from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
  Input,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const StyledHomePage = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 30px;
  }
`;

const CarList = () => {
  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: "'${label}' không thể nhỏ hơn ${min}",
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Biển Số',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Hiệu Xe',
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tiền Nợ',
      dataIndex: 'debt',
      key: 'debt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, i) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      number: '1',
      plate: '81A-12345',
      carName: 'Audi',
      name: 'Nguyen Van A',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '2',
      number: '2',
      plate: '81A-12345',
      carName: 'Mercedes',
      name: 'Nguyen Van B',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '3',
      number: '3',
      plate: '81A-12345',
      carName: 'Toyota',
      name: 'Nguyen Van C',
      phone: '0123456789',
      debt: '0',
    },
  ];

  function confirm() {
    message.info('Clicked on Yes.');
  }

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <StyledHomePage>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản Lý Xe</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách Xe</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title className="main-title" level={2}>
          Danh sách xe
        </Title>
        <Form
          name="basic"
          className="filter-form"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="inline"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item label="Biển Số" name="plate">
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Chủ Xe" name="owner">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={data} />
      </div>
    </StyledHomePage>
  );
};

export default CarList;
