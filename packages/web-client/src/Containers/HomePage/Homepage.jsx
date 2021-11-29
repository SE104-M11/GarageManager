import React  from 'react';
import { Layout as AntLayout, Breadcrumb } from 'antd';
import styled from 'styled-components';


const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const Homepage = () => {

    return (
        <StyledHomePage >
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            This is Home Page.
        </div>
        </StyledHomePage>
    );
};

export default Homepage;
