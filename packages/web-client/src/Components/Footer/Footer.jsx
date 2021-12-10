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
      <MainFooter className="main-footer">Garage UIT Group</MainFooter>
    </StyledFooter>
  );
};

export default Footer;
