/* eslint-disable no-template-curly-in-string */
import { DownloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Divider, Form, InputNumber, Table, Typography, notification } from 'antd';
import React, { useState } from 'react';

import { InventoryReportStyles } from './styles';
import axiosClient from '../../Configs/Axios';

const { Title } = Typography;

const columns = [
  {
    title: 'Tên Vật tư',
    render: (value) => (value.accessory.name)
  },
  {
    title: 'Tồn đầu',
    dataIndex: 'openingStock',
    key: 'openingStock',
  },
  {
    title: 'Phát sinh',
    dataIndex: 'arising',
    key: 'arising',
  },
  {
    title: 'Tồn cuối',
    dataIndex: 'endingStock',
    key: 'endingStock',
  },
];

const validateMessages = {
  required: 'Nhập ${label}',
  type: {
    number: "'${label}' không phải là số hợp lệ!",
  },
  number: {
    min: "'${label}' không thể nhỏ hơn ${min}!",
    max: "'${label}' không thể lớn hơn ${max}!",
    range: '${label} phải ở giữa ${min} và ${max}!',
  },
};

const InventoryReport = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [time, setTime] = useState({ month: '', year: '' });
  const [dataTable, setDataTable] = useState([]);
  const [form] = Form.useForm();

  const onFinishCreateTable = (values) => {
    const { month, year } = values;
    const postData = async () => {
      try {
        const response = await axiosClient.post('/inventory-reports',values)
        response.reportDetails.length === 0
          ? notification.error({
              message:
                'Thông tin không hợp lệ. Không có vật tư được nhập hay sử dung trong thời gian bạn nhập',
            })
          : notification.success({
              message: 'Lập báo cáo thành công',
            });
        setDataTable(response.reportDetails);
      } catch (error) {
        console.log(error);
      }
    }
    postData();
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

  return (
    <InventoryReportStyles menuSelectedKey={'inventory-report-page'}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Báo cáo tồn</Breadcrumb.Item>
        <Breadcrumb.Item>Báo cáo tồn tháng</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title className="main-title" level={2}>
          Báo cáo tồn
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
          form={form}
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
              Xem báo cáo
            </Button>
          </Form.Item>
        </Form>
        <div className={showReportResult ? 'show' : 'hide'}>
          {dataTable.length !== 0 && <Divider plain>Kết quả</Divider>}
          {dataTable.length !== 0 && <ResultTitle />}
          {dataTable.length !== 0 && <Table
            className="result-table"
            columns={columns}
            dataSource={dataTable}
            pagination={{ defaultPageSize: 5 }}
          />}
          {
            dataTable.length !== 0 && <Button
              className="button-finish"
              icon={<DownloadOutlined />}
              type="primary"
              size="middle"
            >
              In báo cáo
            </Button>
          }
        </div>
      </div>
    </InventoryReportStyles>
  );
};

export default InventoryReport;
