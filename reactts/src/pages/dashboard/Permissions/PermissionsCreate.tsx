import React from "react";

/**
 * Ant Design
 */
import { Card, Form, Input, Button, Alert, Typography, Space, Row, Col, Divider, message, Tag, theme } from 'antd';
import { SaveOutlined, DeleteOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

/**
 * Helmet
 */
import { Helmet } from 'react-helmet-async';

/**
 * Style
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/page/userCreation.scss';

/**
 *  Component
 */
import AdminLayout from "@/components/dashboard/layout/AdminLayout";



const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;

const PermissionForm: React.FC = () => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    // Handle save permission
    const handleSave = async () => {
        const values = await form.validateFields();
        // Simulate save operation
        console.log('Saved permission:', values);
        message.success('Lưu quyền hạn thành công!');
    };

    // Handle temporary delete (reset form)
    const handleTempDelete = () => {
        form.resetFields();
    };

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'permissions-create',
        SideBarActiveOpenKey: ['access-control'],
        HeaderTitle: 'Permission Create',
        BreadcrumbItems: {
            items: [
                { title: 'Access Control', path: '/admin' },
                { title: 'Permission List' },
            ],
        },
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>LaraStack CMS - Permission</title>
            </Helmet>
            <AdminLayout {...PageContainerConfig}>
                <Row gutter={[24, 24]}>
                    {/*  */}
                    <Col xs={24} lg={16}>
                        {/* Permission tip */}
                        <Alert message="Mẹo nhỏ" description="Việc phân quyền chính xác giúp hệ thống bảo mật hơn. Kiểm tra kỹ mã quyền trước khi lưu." type="info" showIcon icon={<InfoCircleOutlined />} style={{ marginBottom: 24 }} />

                        {/* Main form card */}
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            {/* Thông tin quyền hạn */}
                            <Title level={4} style={{ marginBottom: 24 }}>
                                Thông tin quyền hạn
                            </Title>

                            <Form form={form} layout="vertical" initialValues={{ permissionName: '', description: '' }} >
                                {/* Tên quyền (Stug) */}
                                <Form.Item name="permissionName"
                                    label={<React.Fragment> <span>Tên quyền </span> <Tag color="blue" style={{ fontSize: 12 }}>Bắt buộc</Tag> </React.Fragment>}
                                    rules={[{ required: true, message: 'Vui lòng nhập tên quyền' }]}
                                    extra={
                                        <Space direction="vertical" size={2}>
                                            <Text type="secondary">Ví dụ: USER_MANAGE_CREATE</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                ĐÍNH DẠNG GỢI Ý: MODULE_ACTION_OBJECT
                                            </Text>
                                        </Space>
                                    } >
                                    <Input placeholder="Nhập mã quyền (VD: USER_MANAGE_CREATE)" allowClear />
                                </Form.Item>

                                {/* Mô tả chi tiết */}
                                <Form.Item name="description" label="Mô tả chi tiết" rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết cho quyền' }]} >
                                    <TextArea rows={4} placeholder="Quyền này cho phép người dùng có thể..." showCount maxLength={200} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    {/* Right side actions and tips card */}
                    <Col xs={24} lg={8}>

                        <Card style={{ marginBottom: 12 }}>
                            {/* THAO TÁC ĐĂNG KÝ 区块 */}
                            <Title level={5} style={{ marginBottom: 16 }}>
                                THAO TÁC ĐĂNG KÝ
                            </Title>

                            {/* Action buttons group */}
                            <Row justify="end">
                                <Space size="middle">
                                    <Button danger icon={<DeleteOutlined />} onClick={handleTempDelete} >
                                        Xóa quyền hạn
                                    </Button>
                                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ minWidth: 120 }}>
                                        Lưu quyền hạn
                                    </Button>
                                </Space>
                            </Row>
                        </Card>
                        <Card >
                            <Title level={5} style={{ marginTop: 0 }}> <InfoCircleOutlined style={{ marginRight: 8 }} /> Chi dẫn </Title>
                            <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
                                <li>
                                    <Text>Không sử dụng các ký tự đặc biệt trong mã quyền.</Text>
                                </li>
                                <li>
                                    <Text>Phải có tiền tố của Module tương ứng.</Text>
                                </li>
                                <li>
                                    <Text>Độ dài tối đa của mã quyền là 50 ký tự.</Text>
                                </li>
                                <li>
                                    <Text>Định dạng khuyến nghị: MODULE_ACTION_OBJECT (ví dụ: USER_CREATE_ACCOUNT).</Text>
                                </li>
                            </ul>

                            <Divider style={{ margin: '16px 0' }} />

                            <div style={{ background: token.colorBgContainer, padding: 16, borderRadius: 8, textAlign: 'center', }}>
                                <QuestionCircleOutlined style={{ fontSize: 24, color: token.colorPrimary, marginBottom: 8 }} />
                                <Title level={5} style={{ marginBottom: 4 }}>
                                    CẦN HỖ TRỢ?
                                </Title>
                                <Paragraph type="secondary" style={{ marginBottom: 12 }}>
                                    Liên hệ với quản trị viên để được giải đáp chi tiết về phân quyền.
                                </Paragraph>
                                <Button type="link" href="mailto:admin@example.com" style={{ padding: 0 }}>
                                    LIÊN HỆ ADMIN →
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </AdminLayout>
        </React.Fragment>
    );
};

export default PermissionForm;