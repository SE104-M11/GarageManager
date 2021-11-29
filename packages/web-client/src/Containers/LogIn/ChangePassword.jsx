import React, {useState} from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Form, Input, Button } from 'antd';
import {useSelector } from 'react-redux';
import * as actions from './actions';
import { useHistory } from 'react-router-dom';
import {LoadingScreenCustom } from './../../Components' 
const ChangePasswordStyled = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
    position: relative;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }
`;

const ChangePassword = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const history = useHistory();
  const [isLoading, setIsLoading] =useState(false);
  const user=useSelector(state=>state.user);

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
        matKhauMoi:values.matKhauMoi
      };
      await actions.onChangePasswordRequest(data);
      setIsLoading(false);
      alert('Đổi mật khẩu thành công');
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      alert(e.message);
    }
  };

  return (
    <ChangePasswordStyled>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
        <div className="main-title">
          <h3 style={{ marginTop: '5em', marginBottom: '0px' }}>Thay đổi mật khẩu</h3>
        </div>

        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
          fields={[
            {
              name: ["tenTaiKhoan"],
              value: user.tenTaiKhoan,
            },
          ]}
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
          <Form.Item
            name="matKhauMoi"
            label="Mật Khẩu Mới"
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
          <Form.Item
            name="xacNhanMatKhau"
            label="Nhập lại mật khẩu mới "
            dependencies={['matKhau']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('matKhauMoi') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Xác nhận mật khẩu mới không trùng với mật khẩu bạn tạo!'));
                },
              }),
            ]}
          >
            <Input.Password style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Thay đổi tài khoản
            </Button>
          </Form.Item>
        </Form>
        <LoadingScreenCustom isLoading ={isLoading} />
      </div>
    </ChangePasswordStyled>
  );
};

export default ChangePassword;
