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
import { LoadingScreenCustom } from './../../Components';
const { Content } = AntLayout;
const { Title } = Typography;
const { Search } = Input;

const StyledAccessaryList = styled(AntLayout)`
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
        title={'Bạn có chắc chắn muốn xóa không ?'}
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
  const [inputSearch, setInputSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataEditAccessary, setDataEditAccessay] = useState({
    typeAccessory: '',
    idAccessary: '',
    nameAccessary: '',
    unitPrice: '',
  });

  //Form
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
      setIsLoading(true);
      const typeAccessary = await axiosClient.get('/loaivattus/get');
      let listAccessay = await axiosClient.get('/accessories');
      let listType = typeAccessary.object.listLoaiVatTu;
      listType = listType.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
      listAccessay = listAccessay.map((item, index) => {
        return {
          ...item,
          key: index + 1,
          
        };
      });
      setDataTypeAccessay(listType);
      setDataListAccessary(listAccessay);
      setIsLoading(false);
    } catch (error) {
      notification.error({
        message: 'Đã có khi lấy dữ liệu danh sách loại vật tư. Vui lòng thử lại',
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAPI();
  }, []);

  useEffect(() => {
    const getApiSearch = async () => {
      try {
        setIsLoading(true);
        let dataResultSearch = await axiosClient.get(`/accessories/search?name=${inputSearch}`);
        dataResultSearch = dataResultSearch.map((item, index) => {
          return {
            ...item,
            key: index + 1,
          };
        });
        setDataListAccessary(dataResultSearch);
        setIsLoading(false);
      } catch (error) {
        notification.error({
          message: 'Đã có khi lấy dữ liệu danh sách phụ tùng. Vui lòng thử lại',
        });
        setIsLoading(false);
      }
    };
    getApiSearch();
  }, [inputSearch]);

  //FUNCTION HANDLE
  //Thêm  phụ tùng và sửa chữa
  const onFinishAccessary = (values) => {
    if (!checkEdit) {
      const postData = async () => {
        try {
          setIsLoading(true);
          await axiosClient.post('/accessories', values);
          notification.success({
            message: 'Nhập phụ tùng thành công',
          });
          setIsLoading(false);
        } catch (error) {
          notification.error({
            message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
          });
          setIsLoading(false);
        }
      };
      postData();
      formAcccessary.resetFields();
      getAPI();
    } else {
      const postData = async () => {
        try {
          setIsLoading(true);
          await axiosClient.put(`/accessories/${dataEditAccessary.idAccessary}`, values);
          notification.success({
            message: 'Chỉnh sửa phụ tùng thành công',
          });
          setIsLoading(false);
        } catch (error) {
          notification.error({
            message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
          });
          setIsLoading(false);
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
    setInputSearch(values);
  };

  //Xóa một vật tư
  const onFinishDeleteAccessary = (idAccessary) => {
    const postData = async () => {
      try {
        await axiosClient.delete(`/accessories/${idAccessary}`);
        notification.success({
          message: 'Xóa phụ tùng thành công',
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
        });
      }
    };
    postData();
    getAPI();
  };

  //Chỉnh sửa vật tư
  const onFinishEditAccessary = (accessary) => {
    const dataEdit = {
      typeAccessory: accessary.typeAccessory,
      idAccessary: accessary._id,
      nameAccessary: accessary.name,
      unitPrice: accessary.unitPrice,
    };
    setDataEditAccessay(dataEdit);
    setCheckEdit(true);
    formAcccessary.setFieldsValue(dataEdit);
  };

  //Header table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 60,
      render: (v, i) => {
        return <span>{dataListAccessary.indexOf(i) + 1}</span>;
      },
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
            onFinish={onFinishAccessary}
            form={formAcccessary}
          >
            <Form.Item
              label="Loại phụ tùng"
              name="typeAccessory"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Chọn loại phụ tùng"
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
            <Form.Item
              label="Tên phụ tùng"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: '100%' }} defaultValue={dataEditAccessary.nameAccessary} />
            </Form.Item>
            <Form.Item
              label="Đơn giá"
              name="unitPrice"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                style={{ width: '100%' }}
                defaultValue={dataEditAccessary.unitPrice}
              />
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
              Danh sách phụ tùng
            </Title>
            <Divider />
            <p style={{ fontSize: 20, fontWeight: '600' }}>Nhập phụ tùng:</p>
            {displayAddOnlyAdmin()}
            <p style={{ fontSize: 20, fontWeight: '600' }}>Tìm kiếm phụ tùng:</p>
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
                <Search
                  placeholder="Nhập tên phụ tùng"
                  enterButton="Search"
                  onSearch={onFinishSearch}
                  allowClear
                />
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
          <LoadingScreenCustom isLoading={isLoading} />
        </div>
      </Content>
    </StyledAccessaryList>
  );
};

export default AccessaryList;
