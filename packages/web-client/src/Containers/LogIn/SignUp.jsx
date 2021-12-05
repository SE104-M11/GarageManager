import React,{useState} from 'react';
import styled from 'styled-components';
import { Breadcrumb, Layout as AntLayout, Typography, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {LoadingScreenCustom } from './../../Components'

const { Title } = Typography;

const StyledSignUp = styled(AntLayout)`
  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .site-layout-background {
    background: #fff;
    position: relative;
  }
`;

const SignUp = () => {
    let history = useHistory();
    const [isLoading, setIsLoading] =useState(false);
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
    const onFinish= async (obj)=>{
        try{
            setIsLoading(true);
            var dataRequest={
                "tenTaiKhoan": obj.tenTaiKhoan,
                "matKhau":obj.matKhau,
                "email":obj.email
            }
            await actions.onRegisterRequest(dataRequest);
            setIsLoading(false);
            alert("Bạn vui lòng truy cập email tài khoản này để kích hoạt tài khoản trước khi sử dụng account này để truy cập website")
            history.push('/');    
        }catch(e){
            setIsLoading(false);
            alert(e.message);
        }
        
    }
    return (
        <StyledSignUp>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Quản lý</Breadcrumb.Item>
                <Breadcrumb.Item>Đăng kí tài khoản mới</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Title className="main-title" level={2} style={{ marginTop: '5em' }}>
                Đăng Ký
                </Title>

                <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish}>
                <Form.Item
                    name="tenTaiKhoan"
                    label="Tên Tài Khoản"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
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
                        if (!value||value.length>=8 ) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu có ít nhất 8 kí tự'));
                        },
                    }),
                    ]}
                >
                    <Input.Password style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="xacNhanMatKhau"
                    label="Nhập Lại Mật Khẩu"
                    dependencies={['matKhau']}
                    rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('matKhau') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Xác nhận mật khẩu không trùng với mật khẩu!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                    <Button type="primary" htmlType="submit">
                    Đăng Ký
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                    Đã có tài khoản <Link to="/log-in">Đăng nhập ngay!</Link>
                </Form.Item>
            </Form>
            <LoadingScreenCustom isLoading ={isLoading} />
        </div>
    </StyledSignUp>
  );
};

export default SignUp;
