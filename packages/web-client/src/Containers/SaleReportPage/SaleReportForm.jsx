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
  Divider,
  Table,
  Popconfirm,
  message,
  InputNumber,
} from 'antd';
import { CheckCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const StyledSaleReportForm = styled(AntLayout)`
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

  .filter-form {
    justify-content: center;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .result-total {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
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

const SaleReportForm = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [dateData, setDateData] = useState({ month: '', year: '' });
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      carName: 'Toyota',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
    {
      key: '2',
      carName: 'Honda',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
    {
      key: '3',
      carName: 'Suzuki',
      numberRepair: '521452',
      ratio: '100%',
      total: 5000000,
    },
  ]);

  dataSource.map((item, index) => (item.carNumber = index + 1));

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
      dataIndex: 'carNumber',
      key: 'carNumber',
    },
    {
      title: 'Mã Hiệu Xe',
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: 'Số Lượng Sửa',
      dataIndex: 'numberRepair',
      key: 'numberRepair',
    },
    {
      title: 'Tỉ Lệ',
      dataIndex: 'ratio',
      key: 'ratio',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'total',
      key: 'total',
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
            onConfirm={() => handleDelete(index.carNumber)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = (carNumber) => {
    console.log(carNumber);
    setDataSource(dataSource.filter((item) => item.carNumber !== carNumber));
    message.info('Clicked on Yes.');
  };

  const onFinishCreateTable = (values) => {
    const { month, year } = values;
    setDateData({ ...dateData, month: month, year: year });
    setShowReportResult(true);
  };

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setShowReportResult(false);
  };

  const onFinishAddItem = (values) => {
    values.carNumber = dataSource.length + 1;
    const newData = {
      carNumber: values.carNumber,
      carName: values.carName,
      numberRepair: values.numberRepair,
      ratio: `${values.ratio}%`,
      total: values.total,
    };
    setDataSource([...dataSource, newData]);
  };

  const ResultTitle = () => (
    <Title className="main-title-result" level={4}>
      Kết quả báo cáo doanh thu tháng {dateData.month} năm {dateData.year}
    </Title>
  );

  const TotalValues = () => {
    const total = dataSource.reduce((a, b) => a + b.total, 0);
    return <Text className="result-total">Tổng doanh thu tháng: {total} đồng</Text>;
  };

  return (
    <StyledSaleReportForm menuSelectedKey={'sales-report-form'}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Báo cáo doanh số</Breadcrumb.Item>
        <Breadcrumb.Item>Form doanh thu tháng</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Form doanh thu tháng
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
          <Form.Item
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
          </Form.Item>

          <Form.Item
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
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lập báo cáo doanh thu
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="carName"
            label="Mã Hiệu Xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberRepair"
            label="Số Lượng Sửa"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ratio"
            label="Tỉ Lệ"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
                max: 100,
              },
            ]}
          >
            <InputNumber style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item
            name="total"
            label="Tổng Tiền"
            rules={[
              {
                required: true,
                type: 'number',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Thêm vào báo cáo
            </Button>
          </Form.Item>
        </Form>

        <div className={showReportResult ? 'show' : 'hide'}>
          <Divider plain>Kết quả</Divider>
          <ResultTitle />
          <TotalValues />
          <Table
            className="result-table"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
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
    </StyledSaleReportForm>
  );
};

export default SaleReportForm;
