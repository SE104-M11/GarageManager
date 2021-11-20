import { Input } from 'antd';
import { Select } from 'antd';
import { InputNumber } from 'antd';
import React from 'react';
import { Layout as AntLayout, Breadcrumb, Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './ManagerList.css';
const { Header, Footer, Content } = AntLayout;
const { Option } = Select;

function onChange(value) {
  console.log('changed', value);
}

function MethodTable() {
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
}

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

function handleChange(value) {
  console.log(`selected ${value}`);
}

const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const ManagerList = () => {
  function ManagerListView() {
    const displayAddOnlyAdmin = () => {
      return (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="" className="larger-size">Mã loại phụ tùng</label>
                <Input size="large" placeholder="Nhập mã loại phụ tùng" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="" className="larger-size">Tên loại phụ tùng</label>
                <Input size="large" placeholder="Nhập tên loại phụ tùng" />
              </div>
            </div>
            <div className="col" style={{ lineHeight: 6.5 }}>
              <Button type="primary" size="large" style={{ width: 150 }}>
                Thêm mới
              </Button>
            </div>
          </div>
          <hr className="hr--custom" />
          <div className="row">
            <div className="col">
              <div className="">
                <div>
                  <label className="larger-size">Tên phụ tùng</label>
                </div>
                <Select
                  defaultValue="lucy"
                  style={{ width: 300 }}
                  size="large"
                  onChange={handleChange}
                >
                   <Option value="jack">Kính chiếu hậu xe Mercedes</Option>
                    <Option value="lucy">Lốp xe Mercedes</Option>
                    <Option value="Yiminghe">Vô lăng xe Mercedes</Option>
                </Select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Tên phụ tùng</label>
                <Input size="large" style={{ width: 300 }} placeholder="Tên phụ tùng mới" />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="unitPrice">Đơn giá</label>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={3}
                  onChange={onChange}
                  size="large"
                  style={{ width: 300 }}
                />
              </div>
            </div>
            <div className="col" style={{ lineHeight: 6 }}>
              <Button type="primary" size="large" style={{ width: 150 }}>
                Thêm mới
              </Button>
            </div>
          </div>
          <hr className="hr--custom" />
        </>
      );
    };

    return (
      <>
        <div className="container parent">
          <div className="box">
            <h4 className="text-center mb-4">Danh sách phụ tùng</h4>
            {displayAddOnlyAdmin()}
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="" style={{ paddingRight: 18 }} className="larger-size">
                    Tên loại phụ tùng
                  </label>
                  <Input
                    size="large"
                    style={{ width: 480 }}
                    placeholder="Nhập tên phụ tùng muốn tìm"
                  />
                </div>
              </div>
              <div className="col" style={{}}>
                <Button type="primary" size="large" style={{ width: 150 }}>
                  Tìm ngay
                </Button>
              </div>
            </div>
            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                style={{fontSize: 16}}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <StyledHomePage>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <ManagerListView />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UEDD</Footer>
      </Content>
    </StyledHomePage>
  );
};

export default ManagerList;
