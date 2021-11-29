/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  message,
  InputNumber,
  Select,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StyledRepairForm = styled(AntLayout)`
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

  .result-table {
    margin-bottom: 30px;
  }

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
`;

const RepairForm = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      number: '1',
      content: 'Thay lốp xe',
      sparePart: 'Lốp xe',
      price: '500000',
      numberSpare: '1',
      wage: '200000',
      money: '700000',
    },
    {
      key: '2',
      number: '2',
      content: 'Thay bóng đèn',
      sparePart: 'Bóng đèn',
      price: '200000',
      numberSpare: '1',
      wage: '100000',
      money: '300000',
    },
    {
      key: '3',
      number: '3',
      content: 'Thay kính chiếu hậu',
      sparePart: 'Kính chiếu hậu',
      price: '300000',
      numberSpare: '1',
      wage: '200000',
      money: '500000',
    },
  ]);

  dataSource.map((item, index) => (item.number = index + 1));

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

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

  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Nội Dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Vật Tư Phụ Tùng',
      dataIndex: 'sparePart',
      key: 'sparePart',
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'numberSpare',
      key: 'numberSpare',
    },
    {
      title: 'Tiền Công',
      dataIndex: 'wage',
      key: 'wage',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(index.number)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const { Option } = Select;

  // const [form] = Form.useForm();

  dataSource.map((item, index) => (item.number = index + 1));

  const handleDelete = (number) => {
    console.log(number);
    setDataSource(dataSource.filter((item) => item.number !== number));
    message.info('Clicked on Yes.');
  };

  const onFinishAddItem = (values) => {
    values.number = dataSource.length + 1;
    const newData = {
      number: values.number,
      content: values.content,
      sparePart: values.sparePart,
      price: values.price,
      wage: values.wage,
      numberSpare: values.numberSpare,
      money: values.money,
    };
    setDataSource([...dataSource, newData]);
  };

  return (
    <StyledRepairForm menuSelectedKey={'sales-report-form'}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Phiếu sửa chữa</Breadcrumb.Item>
        <Breadcrumb.Item>Lập phiếu sửa chữa</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title className="main-title" level={2}>
          Lập phiếu sửa chữa
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Biển Số"
            name="plate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="81A-12345">81A-12345</Option>
              <Option value="81B-12345">81B-12345</Option>
              <Option value="81C-12345">81C-12345</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội Dung"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sparePart"
            label="Vật Tư Phụ Tùng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value="Bánh Xe">Bánh Xe</Option>
              <Option value="Bóng Đèn">Bóng Đèn</Option>
              <Option value="Gương">Gương</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="numberSpare"
            label="Số Lượng"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
                max: 100,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="wage"
            label="Tiền Công"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>

        <Table
          className="result-table"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Button className="button-finish" icon={<DownloadOutlined />} type="primary" size="middle">
          In phiếu sửa chữa
        </Button>
      </div>
    </StyledRepairForm>
  );
};

export default RepairForm;
