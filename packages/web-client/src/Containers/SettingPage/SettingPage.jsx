/* eslint-disable no-template-curly-in-string */

import React from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Divider,
} from 'antd';

import { MaxCarForm, CarBrandNumberForm, SupplyTypeForm } from '../../Components/SettingForm';

const { Title } = Typography;

const StyledSaleReportPage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 50px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }
  
  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const SettingPage = () => {

  return (
    <StyledSaleReportPage menuSelectedKey={'sales-report-page'}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Cài đặt và thay đổi quy định</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Cài đặt và thay đổi quy định
        </Title>

        <Divider />

        <MaxCarForm />

        <Divider />

        <CarBrandNumberForm />

        <Divider />

        <SupplyTypeForm />
      </div>
    </StyledSaleReportPage>
  );
};

export default SettingPage;
