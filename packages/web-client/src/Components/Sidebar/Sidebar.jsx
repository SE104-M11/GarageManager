import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HomeOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const StyledSider = styled(Sider)`
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <span>Home Page</span>
          <Link to="/"></Link>
        </Menu.Item>
        <Menu.Item key="/customer" icon={<UserOutlined />}>
          <span>Customer Page</span>
          <Link to="/customer"></Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Quản lý phụ tùng">
        <Menu.Item key="/listAccessary">
            <span>Nhập vật tư phụ tùng</span>
            <Link to="/import-accessary"></Link>
          </Menu.Item>
          <Menu.Item key="/list-accessary">
            <span>Danh sách phụ tùng</span>
            <Link to="/list-accessary"></Link>
          </Menu.Item>
          <Menu.Item key="/wage">
            <span>Danh sách tiền công</span>
            <Link to="/wage"></Link>
          </Menu.Item>
         
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
