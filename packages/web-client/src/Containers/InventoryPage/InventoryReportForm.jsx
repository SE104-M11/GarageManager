import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { InventoryReportStyles as InventoryReportFormStyles } from './styles';

const { Item } = Form;
const { Title } = Typography;

const InventoryReportForm = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [time, setTime] = useState({ month: '', year: '' });
  const [dataSource, setDataSource] = useState([
    {
      index: 1,
      itemName: 'Toyota',
      itemAmount: 122,
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 2,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 3,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 4,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 5,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 6,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 7,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 8,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 9,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 10,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 11,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
    {
      index: 12,
      itemName: 'Toyota',
      itemUsed: 8,
      itemRest: 2,
    },
  ]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Vật tư phụ tùng',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Tồn đầu',
      dataIndex: 'itemAmount',
      key: 'itemAmount',
    },
    {
      title: 'Phát sinh',
      dataIndex: 'itemUsed',
      key: 'itemUsed',
    },
    {
      title: 'Tồn cuối',
      dataIndex: 'itemRest',
      key: 'itemRest',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Bạn có muốn xóa vật phẩm này hay không ?"
            onConfirm={() => handleDelete(index.index)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      number: '${label} không phải số hợp lệ!',
      email: '${label} không phải là email hợp lệ!',
    },
    number: {
      min: '${label} không thể nhỏ hơn ${min}',
      max: '${label} không thể lớn hơn ${max}',
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const onFinishCreateTable = (values) => {
    const { month, year } = values;
    setTime({ ...time, month: month, year: year });
    setShowReportResult(true);
  };

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setShowReportResult(false);
  };

  const ResultTitle = () => (
    <Title className="main-title-result" level={4}>
      Báo cáo tồn tháng {time.month} năm {time.year}
    </Title>
  );

  const handleDelete = (index) => {
    console.log(index);
    setDataSource(dataSource.filter((item) => item.index !== index));
    message.info('Xóa thành công');
  };

  const onFinishAddItem = (values) => {
    const newData = {
      index: dataSource.length + 1,
      itemName: values.itemName,
      itemUsed: values.itemUsed,
    };
    setDataSource([...dataSource, newData]);
  };

  return (
    <InventoryReportFormStyles>
      <Breadcrumb style={{ margin: '16px 16px' }}>
        <Breadcrumb.Item>Báo cáo tồn</Breadcrumb.Item>
        <Breadcrumb.Item>Lập báo cáo tồn</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Lập báo cáo tồn kho tháng
        </Title>
        <Form
          name="basic"
          className="filter-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishCreateTable}
          onFinishFailed={onFinishFailedCreateTable}
          autoComplete="off"
          layout="inline"
          validateMessages={validateMessages}
        >
          <Item
            label="Tháng"
            name="month"
            rules={[
              {
                required: true,
                type: 'number',
                min: 1,
                max: 12,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Item>

          <Item
            label="Năm"
            name="year"
            rules={[
              {
                required: true,
                type: 'number',
                min: 2000,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              Lập báo cáo tồn
            </Button>
          </Item>
        </Form>

        <Divider />
        <Form
          {...formLayout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="itemName"
            label="Tên vật phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="itemUsed"
            label="Đã dùng"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
              },
            ]}
          >
            <InputNumber style={{ width: '50%' }} />
          </Form.Item>

          <Form.Item
            name="employeeName"
            label="Tên nhân viên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Thêm vào báo cáo
            </Button>
          </Form.Item>
        </Form>

        <div className={showReportResult ? 'show' : 'hide'}>
          <Divider plain>Kết quả</Divider>
          <ResultTitle />
          <Table
            className="result-table"
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
          />
          <Button
            className="button-finish"
            icon={<CheckCircleOutlined />}
            type="primary"
            size="middle"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </InventoryReportFormStyles>
  );
};

export default InventoryReportForm;
