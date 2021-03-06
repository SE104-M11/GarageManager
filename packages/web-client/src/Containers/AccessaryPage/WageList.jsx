/* eslint-disable no-template-curly-in-string */
import { Input } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Popconfirm,
  Table,
  Button,
  Form,
  Divider,
  Typography,
  notification,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';
import { LoadingScreenCustom, Helper} from './../../Components';

const { Content } = AntLayout;
const { Title } = Typography;
const { Search } = Input;

const StyledWageList = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
    position: relative
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

const WageList = () => {
  //useState
  const [dataListWage, setDataListWage] = useState([]);
  const [checkEdit, setCheckEdit] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataEdit, setDataEditWage] = useState({
    idWage: '',
    nameWage: '',
    price: '',
  });

  //Form
  const [formWage] = Form.useForm();
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
      setIsLoading(true);
      let listWage = await axiosClient.get('/wages');
      listWage = listWage.map((item,index)=>{
        return {
          ...item,
          key:index+1,
          priceVND:Helper.convertNumberToMoney(item.price),
        }
      })
      setDataListWage(listWage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAPI();
  }, []);

  useEffect(() => {
    const getApiSearch = async () => {
      try {
        setIsLoading(true);
        let  dataResultSearch = await axiosClient.get(`/wages/search?name=${inputSearch}`);
        dataResultSearch = dataResultSearch.map((item,index)=>{
          return {
            ...item,
            key:index+1,
            priceVND:Helper.convertNumberToMoney(item.price),
          }
        })
        setDataListWage(dataResultSearch);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: 'Lỗi lấy danh sách tiền công. Vui lòng thử lại',
        });
      }
    };
    getApiSearch();
  }, [inputSearch]);

  //FUNCTION HANDLE

  //Thêm  tiền công và sửa chữa
  const onFinishWage = (values) => {
    if (!checkEdit) {
      const postData = async () => {
        try {
          setIsLoading(true);
          await axiosClient.post('/wages', values);
          notification.success({
            message: 'Nhập tiền công thành công',
          });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          notification.error({
            message: 'Đã có lỗi vui lòng thử lại',
          });
        }
      };
      getAPI();
      postData();
      getAPI();
      formWage.resetFields();
    } else {
      const postData = async () => {
        try {
          setIsLoading(true);
          await axiosClient.put(`/wages/${dataEdit.idWage}`, values);
          notification.success({
            message: 'Chỉnh sửa tiền công thành công',
          });
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          notification.error({
            message: 'Đã có lỗi vui lòng thử lại',
          });
        }
      };
      getAPI();
      postData();
      getAPI();
      setDataEditWage({ idWage: '', nameWage: '', price: '' });
      formWage.resetFields();
      setCheckEdit(false);
    }
  };

  //Tìm kiếm vật tư
  const onFinishSearch = (values) => {
    setInputSearch(values);
  };

  //Xóa một vật tư
  const onFinishDeleteWage = (idWage) => {
    const postData = async () => {
      try {
        await axiosClient.delete(`/wages/${idWage}`);
        notification.success({
          message: 'Xóa tiền công thành công',
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
    postData();
    getAPI();
  };

  //Chỉnh sửa vật tư
  const onFinishEditWage = (wage) => {
    const dataEdit = {
      idWage: wage._id,
      nameWage: wage.name,
      price: wage.price,
    };
    setDataEditWage(dataEdit);
    setCheckEdit(true);
    formWage.setFieldsValue({
      name:dataEdit.nameWage,
      price:dataEdit.price
    });
  };

  //Header table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 60,
      render: (v, i) => {
        return <span>{dataListWage.indexOf(i) + 1}</span>;
      },
    },
    {
      title: 'Tên tiền công',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'priceVND',
      key: 'price',
      width: 150,
    },

    {
      title: 'Thao tác',
      dataIndex: 'handle',
      width: 150,
      render: (v, i) => {
        return (
          <TableActions
            onDelete={() => onFinishDeleteWage(i._id)}
            onEdit={() => onFinishEditWage(i)}
          />
        );
      },
    },
  ];

  const WageListView = () => {
    const displayAddOnlyAdmin = () => {
      return (
        <>
          <Divider />
          <p style={{ fontSize: 20, fontWeight: '600' }}>Nhập tiền công:</p>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinishWage}
            form={formWage}
          >
            <Form.Item label="Tên tiền công" name="name">
              <Input style={{ width: '100%' }}  />
            </Form.Item>
            <Form.Item label="Đơn giá" name="price">
              <Input type="number" style={{ width: '100%' }}  />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {checkEdit === true ? 'Chỉnh sửa' : 'Thêm mới'}
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
              Danh sách tiền công
            </Title>
            {displayAddOnlyAdmin()}
            <p style={{ fontSize: 20, fontWeight: '600' }}>Tìm kiếm tiền công:</p>
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
              <Form.Item label="Tên tiền công" name="nameWage">
                <Search
                  placeholder="Tìm kiếm tiền công"
                  enterButton="Search"
                  onSearch={onFinishSearch}
                  allowClear
                />
              </Form.Item>
            </Form>

            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={dataListWage}
                pagination={true}
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
    <StyledWageList>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách tiền công</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <WageListView />
          <LoadingScreenCustom isLoading={isLoading} />
        </div>
      </Content>
    </StyledWageList>
  );
};

export default WageList;
