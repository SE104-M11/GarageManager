/* eslint-disable no-template-curly-in-string */
import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Popconfirm,
  Table,
  Button,
  Select,
  Form,
  Divider,
  Typography,
  notification,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';

const { Content } = AntLayout;
const { Title } = Typography;

const StyledAccessaryList = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 30px;
  }

  .search-input {
    max-width: 200px;
  }
  
  .label-search {
    margin-right: 16px;
  }
  
  .input-search {
    margin-right: 28px;
  }
`;

export const TableActions = ({ onDelete, onEdit }) => {
  return (
    <>
      <Button icon={<EditOutlined />} onClick={onEdit}></Button>
      <Popconfirm
        placement="topRight"
        title={'Are you sure to delete?'}
        onConfirm={onDelete}
        okText={'Yes'}
        cancelText={'No'}
      >
        <Button icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  );
};

const AccessaryList = () => {
  //useState
  const [dataTypeAccessary, setDataTypeAccessay] = useState([]);
  const [dataListAccessary, setDataListAccessary] = useState([]);
  const [checkEdit, setCheckEdit] = useState(false);
  const [dataEditAccessary, setDataEditAccessay] = useState({
    typeAccessory: '',
    idAccessary: '',
    nameAccessary: '',
    unitPrice: '',
  });
  const [inputSearch, setInputSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);

  //Form
  const [formTypeAcccessary] = Form.useForm();
  const [formAcccessary] = Form.useForm();
  const [formSearch] = Form.useForm();

  //Validate
  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: "'${label}' không thể nhỏ hơn ${min}",
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  //Get data
  const getAPI = async () => {
    try {
      const typeAccessary = await axiosClient.get('/loaivattus/get');
      const listAccessay = await axiosClient.get('/accessories');

      setDataTypeAccessay(typeAccessary.object.listLoaiVatTu);
      setDataListAccessary(listAccessay);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAPI();
  }, []);

  console.log(inputSearch);
  useEffect(() => {
    const getApiSearch = async () => {
      try {
        console.log(inputSearch);
        const dataResultSearch = await axiosClient.get(`/accessories/search?name=${inputSearch}`);
        console.log(dataResultSearch);
        setDataListAccessary(dataResultSearch);
      } catch (error) {
        console.log(error);
      }
    };
    getApiSearch();
  }, [inputSearch]);

  //FUNCTION
  function reLoad() {
    setTimeout(function () {
      window.location.reload(true);
    }, 500);
  }

  //Them loai vat tu
  const onFinishTypeAccessary = (values) => {
    const postData = async () => {
      try {
        await axiosClient.post('/loaivattus/create', values);
        notification.success({
          message: 'Import Type Accessory Successfully',
        });
      } catch (error) {
        console.log(error);
      }
    };
    postData();
    formTypeAcccessary.resetFields();
  };

  //Them vat tu or edit vat tu
  const onFinishAccessary = (values) => {
    if (!checkEdit) {
      const postData = async () => {
        try {
          await axiosClient.post('/accessories', values);
          notification.success({
            message: 'Import Accessory Successfully',
          });
          //reLoad();
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      formAcccessary.resetFields();
      getAPI();
    } else {
      const postData = async () => {
        try {
          await axiosClient.put(`/accessories/${dataEditAccessary.idAccessary}`, values);
          notification.success({
            message: 'Edit Accessory Successfully',
          });
          //reLoad();
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      setDataEditAccessay({ typeAccessory: '', idAccessary: '', nameAccessary: '', unitPrice: '' });
      formAcccessary.resetFields();
      setCheckEdit(false);
      getAPI();
    }
  };

  //Tìm kiếm vật tư
  const onFinishSearch = (values) => {
    setInputSearch(values.nameAccessary);
    console.log(resultSearch);
  };
  console.log(dataListAccessary);

  const onFinishDeleteAccessary = (idAccessary) => {
    //event.preventDefault();
    const postData = async () => {
      try {
        await axiosClient.delete(`/accessories/${idAccessary}`);
        //dataListAccessary.filter((item) => item._id !== idAccessary )
        notification.success({
          message: 'Delete Accessory Successfully',
        });
        //reLoad();
      } catch (error) {
        console.log(error);
      }
    };
    postData();
    getAPI();
  };

  //Edit accessary
  const onFinishEditAccessary = (accessary) => {
    console.log(accessary);
    const dataEdit = {
      typeAccessory: accessary.typeAccessory,
      idAccessary: accessary._id,
      nameAccessary: accessary.name,
      unitPrice: accessary.unitPrice,
    };
    setDataEditAccessay(dataEdit);
    setCheckEdit(true);
    formAcccessary.setFieldsValue(dataEdit);
    console.log(formAcccessary);
    console.log(formAcccessary.getFieldValue());
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 60,
    },
    {
      title: 'Tên phụ tùng',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 150,
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'remaining',
      key: 'remaining',
      width: 150,
    },
    {
      title: 'Thao tác',
      dataIndex: 'handle',
      width: 150,
      render: (v, i) => {
        console.log(i);
        return (
          <TableActions
            onDelete={() => onFinishDeleteAccessary(i._id)}
            onEdit={() => onFinishEditAccessary(i)}
          />
        );
      },
    },
  ];

  const AccessaryListView = () => {
    const displayAddOnlyAdmin = () => {
      return (
        <>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinishTypeAccessary}
            form={formTypeAcccessary}
          >
            <Form.Item label="Tên loại phụ tùng" name="tenLoaiVatTu">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinishAccessary}
            form={formAcccessary}
          >
            <Form.Item label="Loại phụ tùng" name="typeAccessory">
              <Select
                placeholder="Select a option"
                showSearch="true"
                showArrow
                allowClear
                style={{ width: '100%' }}
              >
                {dataTypeAccessary.map((item) => {
                  return (
                    <Select.Option
                      key={item._id}
                      value={item.idVatTu}
                      defaultValue={{ value: 'lucy' }}
                    >
                      {item.tenLoaiVatTu}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Tên phụ tùng" name="name">
              <Input style={{ width: '100%' }} defaultValue={dataEditAccessary.nameAccessary} />
            </Form.Item>
            <Form.Item label="Đơn giá" name="unitPrice">
              <Input style={{ width: '100%' }} defaultValue={dataEditAccessary.unitPrice} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {checkEdit == true ? 'Chỉnh sửa' : 'Thêm mới'}
              </Button>
            </Form.Item>
          </Form>

          <Divider />
        </>
      );
    };

    return (
      <>
        <div className="container parent">
          <div className="box">
            <Title className="main-title" level={2}>
              Danh sách phụ tùng
            </Title>
            {displayAddOnlyAdmin()}
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              layout="inline"
              validateMessages={validateMessages}
              onFinish={onFinishSearch}
              form={formSearch}
            >
              <Form.Item label="Tên phụ tùng" name="nameAccessary">
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm ngay
                </Button>
              </Form.Item>
            </Form>

            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={dataListAccessary}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                style={{ fontSize: 16 }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <StyledAccessaryList>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <AccessaryListView />
        </div>
      </Content>
    </StyledAccessaryList>
  );
};

export default AccessaryList;
