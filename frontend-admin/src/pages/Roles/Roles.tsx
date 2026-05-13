/* eslint-disable */
import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Ant Design
 */
import { Card, Form, Input, Button, Alert, Typography, Space, Row, Col, message, Tag, Checkbox, theme } from 'antd';
import { SaveOutlined, DeleteOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

/**
 * Helmet
 */
import { Helmet } from 'react-helmet-async';

/**
 * Config
 */
import { Config } from "@/config/config.ts";

/**
 * Asset
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/page/userCreation.scss';

/**
 *  Component
 */
import AdminLayout from "@/components/Layout/AdminLayout";

/** 
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { GetRoleByIDThunk, CreateRoleThunk, UpdateRoleThunk, DeleteRoleThunk } from "@/redux/features/roles";
import { GetPermissionsListThunk } from "@/redux/features/permission";
import type { AppDispatch } from "@/redux/store";

/**
 * Type
 */
import type { Permission, PermissionListRequest } from "@/types/admin/permissions.type";
import type { Role } from "@/types/admin/roles.type";

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;


const Roles: React.FC<{ isUpdate: boolean }> = ({ isUpdate = false }) => {
    /**
     * Hook
     */
    const [form] = Form.useForm<Role>();
    const { token } = theme.useToken();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const Permissions = useSelector((state: any) => state.permissions?.data || []);

    /** 
     * Handle save role 
     */
    const handleSave = async () => {
        const values = await form.validateFields();
        const role: Role = {
            name: values.name,
            description: values.description,
            permissions: values.permissions,
        };
        try {
            if (isUpdate) {
                await dispatch(UpdateRoleThunk({ ...role, id: Number(id) })).unwrap();
            } else {
                await dispatch(CreateRoleThunk(role)).unwrap();
            }
            navigate('/admin/roles');
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('Something went wrong');
            }
        }
    };

    /** 
     * Handle temporary delete (reset form) 
     */
    const handleFormClear = () => {
        form.resetFields();
    };

    /**
     * Handle delete role 
     */
    const handleDelete = async () => {
        try {
            await dispatch(DeleteRoleThunk(Number(id))).unwrap();
            navigate('/admin/roles');
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('Something went wrong');
            }
        }
    };


    const fetchPermission = useCallback(async () => {
        try {
            const request: PermissionListRequest = { currentPage: 1, perPage: 999 };
            await dispatch(GetPermissionsListThunk(request)).unwrap();
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('Something went wrong');
            }
        }
    }, [dispatch]);

    const fetchRole = useCallback(async () => {
        if (!isUpdate || !id) return;
        try {
            const response = await dispatch(GetRoleByIDThunk(Number(id))).unwrap();
            form.setFieldsValue({
                name: response.data.name,
                description: response.data.description,
                permissions: response.data.permissions?.map((p: any) => p.id) || [],
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('Something went wrong');
            }
        }
    }, [dispatch, id, isUpdate, form]);

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'roles-list',
        SideBarActiveOpenKey: ['access-control'],
        HeaderTitle: 'Role Create',
        BreadcrumbItems: {
            items: [
                { title: 'Access Control', path: '/admin' },
                { title: 'Role Create' },
            ],
        },
    };

    /**
     * Field 
     */

    useEffect(() => {
        fetchRole();
        fetchPermission();
    }, [fetchRole, fetchPermission]);

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={Config.LOGO_ICON} />
                <title>{Config.APP_NAME} - Role Create</title>
            </Helmet>
            <AdminLayout {...PageContainerConfig}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        {/* Role tip */}
                        <Alert message="Role Tip" description="Role name must be unique and follow the format. Check before saving." type="info" showIcon icon={<InfoCircleOutlined />} style={{ marginBottom: 24 }} />

                        {/* Main form card */}
                        <Form form={form} layout="vertical" initialValues={{ roleName: '', description: '', permissions: [] }} >
                            <Card style={{ borderRadius: 12, marginBottom: 12 }} title={<Title level={4}> Role Info </Title>}>
                                {/* Role Name */}
                                <Form.Item name="name"
                                    label={
                                        <Space>
                                            <span>Role Name</span>
                                            <Tag color="red" style={{ fontSize: 12 }}>Required</Tag>
                                        </Space>
                                    }
                                    rules={[{ required: true, message: 'Role name is required' }]}
                                    extra={
                                        <Space direction="vertical" size={2}>
                                            <Text type="secondary">Example: USER_MANAGE_CREATE</Text>
                                            <Text type="secondary">Format: MODULE_ACTION_OBJECT</Text>
                                        </Space>
                                    } required={false} >
                                    <Input placeholder="Role Name (Example: USER_MANAGE_CREATE)" allowClear />
                                </Form.Item>

                                {/* Role Description */}
                                <Form.Item name="description" label="Role Description">
                                    <TextArea rows={4} placeholder="Role can..." showCount maxLength={200} />
                                </Form.Item>
                            </Card>

                            <Card style={{ borderRadius: 12, marginBottom: 12 }} title={<Title level={4}> Permission List </Title>}>
                                <Form.Item name="permissions">
                                    <Checkbox.Group>
                                        <Row gutter={[24, 24]}>
                                            {Permissions.map((permission: Permission) => (
                                                <Col className="gutter-row" span={6} xl={6} lg={6} md={12} xs={24} key={permission.id}>
                                                    <div style={{ border: '1px solid #e8e8e8', padding: 8, borderRadius: 4, width: '100%' }}>
                                                        <Checkbox value={permission.id}>
                                                            <div className="ml-2">
                                                                <div className="font-semibold text-gray-800">{permission.name}</div>
                                                                <div className="text-xs text-gray-400 font-normal">{permission.description}</div>
                                                            </div>
                                                        </Checkbox>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                            </Card>
                        </Form>
                    </Col>

                    {/* Right side actions and tips card */}
                    <Col xs={24} lg={8}>
                        <Card style={{ marginBottom: 12 }} title={<Title level={5} style={{ marginBottom: 16 }}> Action Buttons </Title>}>
                            {/* Action buttons group */}
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    {isUpdate ? (
                                        <Button danger icon={<DeleteOutlined />} onClick={handleDelete} style={{ minWidth: '100%' }}> Delete Role </Button>
                                    ) : (
                                        <Button danger icon={<DeleteOutlined />} onClick={handleFormClear} style={{ minWidth: '100%' }}> Clear Form </Button>
                                    )}
                                </Col>
                                <Col span={24}>
                                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ minWidth: '100%' }}>
                                        Save Role
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card title={<Title level={5} style={{ marginTop: 0 }}> <InfoCircleOutlined style={{ fontSize: 16, marginBottom: 8 }} /> Role Tips </Title>} style={{ marginBottom: 12 }}>
                            <ul style={{ marginBottom: 24 }}>
                                <li>
                                    <Text>Do not use special characters in the role name.</Text>
                                </li>
                                <li>
                                    <Text>Module prefix must be used.</Text>
                                </li>
                                <li>
                                    <Text>Role name length must be between 3 and 50 characters.</Text>
                                </li>
                                <li>
                                    <Text>Recommended format : MODULE_ACTION_OBJECT</Text>
                                </li>
                                <li>
                                    <Text>Example: USER_CREATE_ACCOUNT</Text>
                                </li>
                            </ul>
                        </Card>

                        <Card title={
                            <Title level={5} style={{ marginBottom: 4 }}> <QuestionCircleOutlined style={{ fontSize: 16, color: token.colorPrimary, marginBottom: 8 }} /> Need Help? </Title>
                        } style={{ marginBottom: 12 }}>
                            <Paragraph type="secondary" style={{ marginBottom: 12 }}>
                                Contact the administrator for more details about role management.
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

export default Roles;