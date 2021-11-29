/* eslint-disable no-template-curly-in-string */
import { Input } from 'antd';
import React from 'react';
import { Layout as AntLayout, Breadcrumb, Table, Button, Form, Divider, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Content } = AntLayout;
const { Title } = Typography;

const StyledAccessaryList = styled(AntLayout)`
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

  .search-input {
    max-width: 200px;
  }
  
  .label-search {
    margin-right: 16px;
  }
  
  .input-search {
    margin-right: 28px;
  }
  
`;

const AccessaryList = () => {
  const MethodTable = () => {
    return (
      <>
        <td className="text-center">
          <button className="btn">
            <DeleteOutlined />
          </button>
          <button className="btn">
            <EditOutlined />
          </button>
        </td>
      </>
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 60,
    },
    {
      title: 'Tên phụ tùng',
      dataIndex: 'nameAccessary',
      width: 400,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'quantityRemaining',
      width: 150,
    },
    {
      title: 'Thao tác',
      dataIndex: 'handle',
      width: 150,
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      stt: i + 1,
      nameAccessary: `Đèn xe chíu hậu roll royce`,
      price: `100.000đ`,
      quantityRemaining: 100,
      handle: <MethodTable />,
    });
  }
  
  const AccessaryListView = () => {
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

    const onFinish = (values) => {
      console.log(values);
    };

    const displayAddOnlyAdmin = () => {
      return (
        <>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item label="Mã loại phụ tùng" name="partTypeCode">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Tên loại phụ tùng" name="partTypeName">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item label="Loại phụ tùng" name="partTypeCode">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Tên phụ tùng" name="partName">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Đơn giá" name="unitPrice">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>

          <Divider />
        </>
      );
    };

    return (
      <>
        <div className="container parent">
          <div className="box">
            <Title className="main-title" level={2}>
              Danh sách phụ tùng
            </Title>
            {displayAddOnlyAdmin()}
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              layout="inline"
              validateMessages={validateMessages}
              onFinish={onFinish}
            >
              <Form.Item label="Tên loại phụ tùng" name="partTypeCode">
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm ngay
                </Button>
              </Form.Item>
            </Form>

            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                style={{ fontSize: 16 }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <StyledAccessaryList>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <AccessaryListView />
        </div>
      </Content>
    </StyledAccessaryList>
  );
};

export default AccessaryList;
