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

const SupplyTypeForm = () => {
  const [visibleSupplyType, setVisibleSupplyType] = useState(false);
  const [form] = Form.useForm();
  const [dataSourceSupply, setDataSourceSupply] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await axiosClient.post('/quydinhs/get');
        form.setFieldsValue({
          soLoaiVatTu: response.object.quyDinh.soLoaiVatTu,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, [form]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await axiosClient.post('/loaivattus/get');
        setDataSourceSupply(response.object.listLoaiVatTu);
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, [form]);

  const columnsCarNumber = [
    {
      title: 'Mã loại vật tư',
      dataIndex: 'maLoaiVatTu',
      key: 'maLoaiVatTu',
    },
    {
      title: 'Tên loại vật tư',
      dataIndex: 'tenLoaiVatTu',
      key: 'tenLoaiVatTu',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Popconfirm
            placement="top"
            title="Xác nhận xóa loại vật tư này?"
            onConfirm={() => handleDelete(index.maLoaiVatTu)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = (maLoaiVatTu) => {
    console.log(maLoaiVatTu);
    const deleteSupplyType = async () => {
      try {
        await axiosClient.post('/loaivattus/delete', { maLoaiVatTu: maLoaiVatTu });
        setDataSourceSupply(dataSourceSupply.filter((item) => item.maLoaiVatTu !== maLoaiVatTu));
        form.setFieldsValue({
          soLoaiVatTu: dataSourceSupply.length - 1,
        });
        notification.success({
          message: 'Xóa loại vật tư thành công!',
        });
      } catch (error) {
        console.log(error);
      }
    };
    deleteSupplyType();
  };

  const handleAddSupplyType = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const addSupplyType = async () => {
      try {
        await axiosClient.post('/loaivattus/create', { tenLoaiVatTu: e.target[0].value });
        const response = await axiosClient.post('/loaivattus/get');
        const newSupplyType = response.object.listLoaiVatTu.filter(
          (item) => item.tenLoaiVatTu === e.target[0].value,
        )[0];
        setDataSourceSupply([...dataSourceSupply, newSupplyType]);
        form.setFieldsValue({
          soLoaiVatTu: dataSourceSupply.length + 1,
        });
        notification.success({
          message: 'Thêm loại vật tư thành công!',
        });
      } catch (error) {
        console.log(error);
      }
    };
    addSupplyType();
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
      <Form.Item label="Số loại vật tư" name="soLoaiVatTu">
        <InputNumber disabled={true} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={() => setVisibleSupplyType(true)}>
          Chỉnh sửa danh sách
        </Button>
      </Form.Item>
      <Modal
        title="Số loại vật tư"
        centered
        visible={visibleSupplyType}
        onCancel={() => setVisibleSupplyType(false)}
        width={1000}
        footer={null}
      >
        <form style={{ marginBottom: '10px' }} onSubmit={handleAddSupplyType}>
          <label for="fname" style={{ marginRight: '5px' }}>
            Tên loại vật tư:
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
          dataSource={dataSourceSupply}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 450 }}
        />
      </Modal>
    </StyledForm>
  );
};

export default SupplyTypeForm;
