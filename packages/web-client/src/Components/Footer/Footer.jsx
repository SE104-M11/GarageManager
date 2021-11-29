import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer: MainFooter } = Layout;

const StyledFooter = styled.div`
  .main-footer {
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <MainFooter className="main-footer">Ant Design ©2018 Created by Ant UED</MainFooter>
    </StyledFooter>
  );
};

export default Footer;
