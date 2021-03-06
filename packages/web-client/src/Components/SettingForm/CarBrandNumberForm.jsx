import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Button, InputNumber, Modal, Table, Popconfirm, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import axiosClient from '../../Configs/Axios';

const StyledForm = styled(Form)`
  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const CarBrandNumberForm = (props) => {

  const {setIsLoading} = props;

  const [visibleSupply, setVisibleSupply] = useState(false);
  const [form] = Form.useForm();
  const [dataSourceCarNumber, setDataSourceCarNumber] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post('/quydinhs/get');
        form.setFieldsValue({
          soHieuXe: response.object.quyDinh.soHieuXe,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
        });
      }
    };
    getAPI();
  }, [form, setIsLoading]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post('/hieuxes/get');
        setDataSourceCarNumber(response.object.listHieuXe);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getAPI();
  }, [form, setIsLoading]);

  const columnsCarNumber = [
    {
      title: 'Mã hiệu xe',
      dataIndex: 'maHieuXe',
      key: 'maHieuXe',
    },
    {
      title: 'Tên hiệu xe',
      dataIndex: 'tenHieuXe',
      key: 'tenHieuXe',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Popconfirm
            placement="top"
            title="Xác nhận xóa hiệu xe này?"
            onConfirm={() => handleDelete(index.maHieuXe)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = (maHieuXe) => {
    const deleteCarBrand = async () => {
      try {
        setIsLoading(true);
        await axiosClient.post('/hieuxes/delete', { maHieuXe: maHieuXe });
        setDataSourceCarNumber(dataSourceCarNumber.filter((item) => item.maHieuXe !== maHieuXe));
        form.setFieldsValue({
          soHieuXe: dataSourceCarNumber.length - 1,
        });
        notification.success({
          message: 'Xóa hiệu xe thành công!',
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    deleteCarBrand();
  };

  const handleAddSupplyType = (e) => {
    e.preventDefault();
    const addCarBrand = async () => {
      try {
        setIsLoading(true);
        let data = await axiosClient.post('/hieuxes/create', { tenHieuXe: e.target[0].value });
        if(!data.status){
          notification.info({
            message: data.message,
          });
          setIsLoading(false);
          return ;
        }
        const response = await axiosClient.post('/hieuxes/get');
        const newCarBrand = response.object.listHieuXe.filter(
          (item) => item.tenHieuXe === e.target[0].value,
        )[0];
        setDataSourceCarNumber([...dataSourceCarNumber, newCarBrand]);
        form.setFieldsValue({
          soHieuXe: dataSourceCarNumber.length + 1,
        });
        notification.success({
          message: 'Thêm hiệu xe thành công!',
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
        });
      }
    };
    addCarBrand();
  };

  return (
    <StyledForm
      name="basic"
      layout="inline"
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="max-car-number"
    >
      <Form.Item label="Số hiệu xe" name="soHieuXe">
        <InputNumber disabled={true} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => setVisibleSupply(true)}>
          Chỉnh sửa danh sách
        </Button>
      </Form.Item>
      <Modal
        title="Số hiệu xe"
        centered
        visible={visibleSupply}
        onCancel={() => setVisibleSupply(false)}
        width={1000}
        footer={null}
      >
        <form style={{ marginBottom: '10px' }} onSubmit={handleAddSupplyType}>
          <label for="fname" style={{ marginRight: '5px' }}>
            Tên hiệu xe:
          </label>
          <input
            type="text"
            name="tenHieuXe"
            style={{ marginRight: '5px', borderColor: '#66666621' }}
          />
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </form>
        <Table
          className="result-table"
          columns={columnsCarNumber}
          dataSource={dataSourceCarNumber}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 450 }}
        />
      </Modal>
    </StyledForm>
  );
};

export default CarBrandNumberForm;
