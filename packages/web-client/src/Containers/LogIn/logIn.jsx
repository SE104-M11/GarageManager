import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {LoadingScreen } from './../../Components'
const { Text } = Typography;

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
  const dispatch = useDispatch();
  const params = useParams();
  let history = useHistory();
  let location = useLocation();
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => {
    const isNumeric = /^\/validate-account\/*/;
    if (isNumeric.test(location.pathname)) {
      vaildateAccount(params.id);
    }
  });
  const vaildateAccount = async (params) => {
    try {
      setIsLoading(true);
      await actions.onValidateAccountRequest(params);
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      alert(e.message);
      history.push('/');
    }
  };
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const data = {
        tenTaiKhoan: values.tenTaiKhoan,
        matKhau: values.matKhau,
      };
      await dispatch(actions.onGetUserRequest(data));
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      alert(e.message);
    }
  };
  return (
    <StyledLogIn>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
        <div className="main-title">
          <h3 style={{ marginTop: '5em', marginBottom: '0px' }}>Đăng nhập</h3>
          <Text >
            Bạn quên mật khẩu? <Link to={'forgot-password'}>Quên mật khẩu</Link>
          </Text>
        </div>
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            name="tenTaiKhoan"
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
            name="matKhau"
            label="Mật Khẩu"
            rules={[
              {
                required: true,
              },
              () => ({
                validator(_, value) {
                  if (!value || value.length >= 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu có ít nhất 8 kí tự'));
                },
              }),
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
            Nếu chưa có tài khoản <Link to="/sign-up">Đăng ký ngay!</Link>
          </Form.Item>
        </Form>
      </div>
      <LoadingScreen isLoading={isLoading} />
    </StyledLogIn>
  );
};

export default LogIn;
