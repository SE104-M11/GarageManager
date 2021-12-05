import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../../Containers/LogIn/actions'
import {useHistory} from 'react-router-dom'

const { Header: MainHeader } = Layout;

const StyledHeader = styled.div`
  .site-layout-background {
    background: #fff;
    display: flex;
    justify-content: flex-end; 

    .right-side {
      margin-right: 25px;
    }
  }
`;

const Header = () => {
  const user=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const history=useHistory();

  const onLogOut=(e)=>{
    e.preventDefault();
    dispatch(actions.onLogOut());
    history.push('/log-in');
  }
  const menu = (
    <Menu key="logout">
      <Menu.Item key="btn-logout">
        <Link to ={'#'} onClick={(e)=>{onLogOut(e)}}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledHeader>
      <MainHeader className="site-layout-background" style={{ padding: 0 }}>
        <div className="right-side">
          <Avatar src="https://joeschmoe.io/api/v1/random" className="me-2"/>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Link to="/">{user.tenTaiKhoan}</Link>
          </Dropdown>
        </div>
      </MainHeader>
    </StyledHeader>
  );
};

export default Header;
