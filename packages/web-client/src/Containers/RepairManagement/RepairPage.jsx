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
  DatePicker,
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

const RepairPage = () => {

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
      title: 'Chủ Xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tổng Tiền Sửa Chữa',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Tình trạng sửa',
      dataIndex: 'done',
      key: 'done',
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
      name: 'Nguyen Van A',
      money: '500000',
      done: 'Đã sửa chữa',
    },
    {
      key: '2',
      number: '2',
      plate: '81A-12345',
      name: 'Nguyen Van B',
      money: '1500000',
      done: 'Chưa sửa chữa',
    },
    {
      key: '3',
      number: '3',
      plate: '81A-12345',
      name: 'Nguyen Van C',
      money: '5000000',
      done: 'Chưa sửa chữa',
    },
  ];

  function confirm() {
    message.info('Clicked on Yes.');
  }

  return (
    <StyledHomePage>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Phiếu sửa chữa</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách sửa chữa</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <Title className="main-title" level={2}>
            Danh sách sửa chữa
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
          >
            <Form.Item name="date" label="Ngày">
              <DatePicker style={{ width: '100%' }} />
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

export default RepairPage;
