import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  InputNumber,
  Table,
  Typography,
  notification,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { LoadingScreenCustom } from './../../Components';
import { InventoryReportStyles } from './styles';
import axiosClient from '../../Configs/Axios';

const { Title } = Typography;

const columns = [
  {
    title: 'Tên Vật tư',
    render: (value) => value.accessory.name,
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

const InventoryReport = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [time, setTime] = useState({ month: '', year: '' });
  const [dataTable, setDataTable] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const DATE = new Date();
    const MONTH = DATE.getMonth() + 1;
    const YEAR = DATE.getFullYear();

    let params = {
      month: MONTH,
      year: YEAR,
    };
    form.setFieldsValue(params);
    getInventoryReportByMonth(params);
  }, [form]);

  const onFinishCreateTable = async (values) => {
    const { month, year } = values;
    await getInventoryReportByMonth(values);
    setTime({ ...time, month: month, year: year });
  };

  const getInventoryReportByMonth = async (dates) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/inventory-reports', dates);
      response?.reportDetails.length === 0
        ? notification.warning({
            message:
              'Thông tin không hợp lệ. Không có vật tư được nhập hay sử dung trong thời gian bạn nhập',
          })
        : notification.success({
            message: 'Lấy danh sách báo cáo thành công',
          });
      setDataTable(response?.reportDetails);
      setShowReportResult(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
      });
    }
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
    <InventoryReportStyles>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Báo cáo tồn</Breadcrumb.Item>
        <Breadcrumb.Item>Báo cáo tồn tháng</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, position: 'relative' }}
      >
        <Title data-testid="header" className="main-title" level={2}>
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
            <InputNumber aria-label="month-input" style={{ width: '100%' }} />
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
            <Button aria-label="btn" type="primary" htmlType="submit">
              Xem báo cáo
            </Button>
          </Form.Item>
        </Form>
        <div className={showReportResult ? 'show' : 'hide'}>
          {dataTable.length !== 0 && <Divider plain>Kết quả</Divider>}
          {dataTable.length !== 0 && <ResultTitle />}
          {dataTable.length !== 0 && (
            <Table
              className="result-table"
              columns={columns}
              dataSource={dataTable}
              pagination={{ defaultPageSize: 5 }}
            />
          )}
          {/* {dataTable.length !== 0 && (
            // <Button
            //   className="button-finish"
            //   icon={<DownloadOutlined />}
            //   type="primary"
            //   size="middle"
            // >
            //   In báo cáo
            // </Button>
          )} */}
        </div>
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </InventoryReportStyles>
  );
};

export default InventoryReport;
