import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button } from 'antd';
const { Header, Footer, Content } = AntLayout;
const { Title } = Typography;

const StyledLogIn = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }
`;

const LogIn = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };

  return (
    <StyledLogIn menuSelectedKey={'sales-report-form'}>
      <Header className="site-layout-background" style={{ marginBottom: 10 }} />
      <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
          <Title className="main-title" level={2}>
            Đăng Nhập
          </Title>

          <div className="site-layout-background" >
            <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
              <Form.Item
                name="account"
                label="Tên Tài Khoản"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật Khẩu"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                <Button type="primary" htmlType="submit">
                  Đăng Nhập
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                Nếu chưa có tài khoản <a href="/sign-up">Đăng ký ngay!</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledLogIn>
  );
};

export default LogIn;
