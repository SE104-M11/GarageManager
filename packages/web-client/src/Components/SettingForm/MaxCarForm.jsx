import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Button, InputNumber, notification } from 'antd';

import axiosClient from '../../Configs/Axios';

const StyledForm = styled(Form)`
  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const MaxCarForm = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await axiosClient.post('/quydinhs/get');
        // console.log(response);
        form.setFieldsValue({
          soXeMax: response.object.quyDinh.soXeMax,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, [form]);

  const onFinishMaxCar = (values) => {
    console.log('Success:', values);
    const postData = async () => {
      try {
        await axiosClient.post('/quydinhs/update', {
          ...values,
          maQuyDinh: 'QD-598-867-527',
        });
        notification.success({
          message: 'Cập nhật số xe tiếp nhận tối đa thành công!',
        });
      } catch (error) {
        console.log(error);
      }
    };
    postData();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm
      name="basic"
      layout="inline"
      form={form}
      onFinish={onFinishMaxCar}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="max-car-number"
    >
      <Form.Item
        label="Số xe tiếp nhận tối đa trong ngày"
        name="soXeMax"
        rules={[
          {
            required: true,
            type: 'number',
            min: 1,
            max: 50,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default MaxCarForm;
