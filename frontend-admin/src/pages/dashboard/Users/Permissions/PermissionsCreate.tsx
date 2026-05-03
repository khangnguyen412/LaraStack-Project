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
    /**
     * Hook
     */
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    /** 
     * Handle save permission 
     */
    const handleSave = async () => {
        const values = await form.validateFields();
        // Simulate save operation
        console.log('Saved permission:', values);
        message.success('Lưu quyền hạn thành công!');
    };

    /** 
     * Handle temporary delete (reset form) 
     */
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
                { title: 'Permission Create' },
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
                    <Col xs={24} lg={16}>
                        {/* Permission tip */}
                        <Alert message="Permission Tip" description="Permission name must be unique and follow the format. Check before saving." type="info" showIcon icon={<InfoCircleOutlined />} style={{ marginBottom: 24 }} />

                        {/* Main form card */}
                        <Card style={{ borderRadius: 12 }}>
                            {/* Permission Info */}
                            <Title level={4} style={{ marginBottom: 24 }}>
                                Permission Info
                            </Title>

                            <Form form={form} layout="vertical" initialValues={{ permissionName: '', description: '' }} >
                                {/* Permission Name */}

                                <Form.Item name="permissionName"
                                    label={<React.Fragment> <span>Permission Name </span> <Tag color="blue" style={{ fontSize: 12 }}>Required</Tag> </React.Fragment>}
                                    rules={[{ required: true, message: 'Permission name is required' }]}
                                    extra={
                                        <Space direction="vertical" size={2}>
                                            <Text type="secondary">Example: USER_MANAGE_CREATE</Text>
                                            <Text type="secondary">Format: MODULE_ACTION_OBJECT</Text>
                                        </Space>
                                    } >
                                    <Input placeholder="Permission Name (Example: USER_MANAGE_CREATE)" allowClear />
                                </Form.Item>

                                {/* Permission Description */}
                                <Form.Item name="description" label="Permission Description" rules={[{ required: true, message: 'Vui lòng nhập mô tả cho quyền' }]} >
                                    <TextArea rows={4} placeholder="Permission can..." showCount maxLength={200} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    {/* Right side actions and tips card */}
                    <Col xs={24} lg={8}>

                        <Card style={{ marginBottom: 12 }}>
                            {/* Action Buttons */}
                            <Title level={5} style={{ marginBottom: 16 }}>
                                Action Buttons
                            </Title>

                            {/* Action buttons group */}
                            <Row gutter={[8, 8]}>
                                <Col>
                                    <Button danger icon={<DeleteOutlined />} onClick={handleTempDelete} >
                                        Delete Permission
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ minWidth: 120 }}>
                                        Save Permission
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card >
                            <Title level={5} style={{ marginTop: 0 }}> <InfoCircleOutlined style={{ fontSize: 16, marginBottom: 8 }} /> Permission Tips </Title>
                            <ul style={{ marginBottom: 24 }}>
                                <li>
                                    <Text>Do not use special characters in the permission name.</Text>
                                </li>
                                <li>
                                    <Text>Module prefix must be used.</Text>
                                </li>
                                <li>
                                    <Text>Permission name length must be between 3 and 50 characters.</Text>
                                </li>
                                <li>
                                    <Text>Recommended format : MODULE_ACTION_OBJECT</Text>
                                </li>
                                <li>
                                    <Text>Example: USER_CREATE_ACCOUNT</Text>
                                </li>
                            </ul>

                            <Divider style={{ margin: '16px 0' }} />

                            <Title level={5} style={{ marginBottom: 4 }}>
                                <QuestionCircleOutlined style={{ fontSize: 16, color: token.colorPrimary, marginBottom: 8 }} /> Need Help?
                            </Title>
                            <Paragraph type="secondary" style={{ marginBottom: 12 }}>
                                Contact the administrator for more details about permission management.
                            </Paragraph>
                            <Button type="link" href="mailto:admin@example.com" style={{ padding: 0 }}>
                                Contact Admin →
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </AdminLayout>
        </React.Fragment>
    );
};

export default PermissionForm;