/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  message,
  DatePicker,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StyledCarReception = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .result-table {
    margin-bottom: 30px;
  }
`;

const CarReception = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      number: '1',
      plate: '81A-12345',
      carName: 'Audi',
      name: 'Nguyen Van A',
      phone: '0123456789',
    },
    {
      key: '2',
      number: '2',
      plate: '81A-12345',
      carName: 'Mercedes',
      name: 'Nguyen Van B',
      phone: '0123456789',
    },
    {
      key: '3',
      number: '3',
      plate: '81A-12345',
      carName: 'Toyota',
      name: 'Nguyen Van C',
      phone: '0123456789',
    },
  ]);

  dataSource.map((item, index) => (item.number = index + 1));

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

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
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(index.number)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = (number) => {
    console.log(number);
    setDataSource(dataSource.filter((item) => item.number !== number));
    message.info('Clicked on Yes.');
  };

  const onFinishAddItem = (values) => {
    values.number = dataSource.length + 1;
    const newData = {
      number: values.number,
      carName: values.carName,
      plate: values.plate,
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.address,
    };
    setDataSource([...dataSource, newData]);
  };

  return (
    <StyledCarReception menuSelectedKey={'sales-report-form'}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý xe</Breadcrumb.Item>
        <Breadcrumb.Item>Tiếp nhận xe sửa</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Form tiếp nhận xe sửa
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="plate"
            label="Biển Số"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="carName"
            label="Hiệu Xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Chủ Xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày Tiếp Nhận"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>

        <Title className="main-title" level={2}>
          Danh sách xe tiếp nhận trong ngày
        </Title>
        <Table
          className="result-table"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </StyledCarReception>
  );
};

export default CarReception;
