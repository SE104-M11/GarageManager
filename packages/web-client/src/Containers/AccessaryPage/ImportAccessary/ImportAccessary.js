import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Breadcrumb, Table, Button, Popconfirm, message } from 'antd';
import styled from 'styled-components';
import './ImportAccessary.css';
import { Select } from 'antd';
import { InputNumber } from 'antd';

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(value) {
  console.log('changed', value);
}

const { Header, Footer, Content } = AntLayout;
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const ImportAccessary = () => {
  function ImportAccessaryView() {
    return (
      <>
        <div className="container parent">
          <div className="box">
            <div className="row">
              <h4 className="title-page">Nhập vật tư phụ tùng</h4>
            </div>

            <div className="row mt-3">
              <div className="col">
                <div className="">
                  <div>
                    <label className="larger-size">Tên phụ tùng</label>
                  </div>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 500 }}
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
                <div className="">
                  <div>
                    <label className="larger-size">Số lượng</label>
                  </div>
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
              <div className="col" style={{ lineHeight: 6.4 }}>
                <Button type="primary" size="large" style={{ width: 150 }}>
                  Nhập
                </Button>
              </div>
            </div>
            <div className="row mt-3"></div>
            <div className="row mt-3"></div>

            <p className="mt-3 form-text text-muted larger-size  ">
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp; Để nhập loại phụ tùng mới, bạn vui lòng thêm phụ tùng đó vào danh sách của
              garage <Link to="list-accessary">tại đây</Link>
            </p>
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
          <Breadcrumb.Item>Nhập phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <ImportAccessaryView />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UEDD</Footer>
      </Content>
    </StyledHomePage>
  );
};

export default ImportAccessary;
