import { Input } from 'antd';
import { InputNumber } from 'antd';
import React from 'react';
import { Layout as AntLayout, Breadcrumb, Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const { Header, Footer, Content } = AntLayout;
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

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
    title: 'Tên tiền công',
    dataIndex: 'nameWage',
    width: 400,
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
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
    nameWage: `Thay kính chíu hậu roll royce`,
    price: `100.000đ`,
    handle: <MethodTable />,
  });
}

const ManagerList = () => {
  function ManagerListView() {
    // Function for displaying rows of result table
    const displayAddOnlyAdmin = () => {
      return (
        <>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="">Tên tiền công</label>
                <Input size="large" placeholder="Tên tiền công mới" />
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
                  style={{ width: 500 }}
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
            <h4 className="text-center mb-4">Danh sách tiền công</h4>
            {displayAddOnlyAdmin()}
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="" style={{ paddingRight: 18 }} className="pr-3">
                    Tên loại tiền công
                  </label>
                  <Input
                    size="large"
                    style={{ width: 500 }}
                    placeholder="Nhập tên loại tiền công muốn tìm"
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
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách tiền công</Breadcrumb.Item>
        </Breadcrumb>
        <ManagerListView />
      </Content>
    </StyledHomePage>
  );
};

export default ManagerList;
