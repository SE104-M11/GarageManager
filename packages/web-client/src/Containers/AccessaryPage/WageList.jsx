/* eslint-disable no-template-curly-in-string */
import React from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Table,
  Button,
  Form,
  Input,
  Typography,
  Divider,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;
const { Content } = AntLayout;

const StyledWageList = styled(AntLayout)`
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
  
  .box {
    background-color: #fff;
    padding: 15px;
  }
  .list {
    max-height: 400px;
    overflow-y: auto;
  }
  `;

const WageList = () => {
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

  const WageListView = () => {
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
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item label="Tên tiền công" name="accessaryName">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Đơn giá" name="quantity">
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
              Danh sách tiền công
            </Title>
            {displayAddOnlyAdmin()}
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
                <Form.Item label="Tên loại tiền công" name="accessaryName">
                  <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Form>
            </>
            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <StyledWageList>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách tiền công</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <WageListView />
        </div>
      </Content>
    </StyledWageList>
  );
};

export default WageList;
