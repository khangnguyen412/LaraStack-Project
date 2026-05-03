/* eslint-disable */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Ant Design
 */
import { Grid, Row, Col, Typography, Space, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Helmet
 */
import { Helmet } from 'react-helmet-async';

/**
 * Component
 */
import UserProfileModal from "@/components/dashboard/UsersProfileModal";
import AdminLayout from "@/components/dashboard/layout/AdminLayout";
import { TableData } from "@/components/dashboard/partials/TableData";
import { ListData } from "@/components/dashboard/partials/ListData";
import type { ProColumns } from '@ant-design/pro-table';

/**
 * Redux
 */
import { useDispatch } from 'react-redux';
import { GetPermissionsListThunk } from '@/redux/features/permission';
import type { AppDispatch } from '@/redux/store';

/**
 * Style
 */
import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

/**
 * Type
 */
import type { PermissionListRequest, PermissionListResponse } from '@/types/admin/permissions.type';

const PermissionList: React.FC = () => {
    /**
     * Hook
     */
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const actionRef = useRef<PermissionListRequest>(null);
    const formRef = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    /**
     * State
     */
    const [open, setOpen] = useState(false);
    const [UserId, SetUserId] = useState<string>('')

    /**
     * User Data
     */

    const showModal = (id: string) => {
        SetUserId(id)
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'permissions-list',
        SideBarActiveOpenKey: ['access-control'],
        HeaderTitle: 'Permission List',
        BreadcrumbItems: {
            items: [
                { title: 'Access Control', path: '/admin' },
                { title: 'Permission List' },
            ],
        },
    };

    /**
     * Table Config
     */
    const columnsConfig: ProColumns<any>[] = [
        {
            title: 'Id',
            hidden: true,
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            search: true,
            formItemProps: { label: "Name" },
            fieldProps: { placeholder: "Search by name..." },
            render: (dom) => <Typography.Text>{dom}</Typography.Text>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            search: true,
            formItemProps: { label: "Description" },
            fieldProps: { placeholder: "Search by description..." },
            render: (dom) => <Typography.Text>{dom}</Typography.Text>,
        },
        {
            title: 'Action',
            key: 'action',
            responsive: ['md'],
            search: false,
            render: (_: any, record: { id: string }) => (
                <Space size="small">
                    <Button onClick={() => showModal(record.id)} icon={<EyeOutlined />} key="view" color="primary" variant="outlined" />
                    <Button icon={<EditOutlined />} key="edit" color="primary" variant="outlined" /> {/* /admin/user/${record.key}/edit */}
                    <Button icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" /> {/* /admin/user/${record.key}/delete */}
                </Space>
            ),
        },
    ]

    const tablePropsConfig = {
        actionRef: actionRef,
        formRef: formRef,
        rowKey: 'id',
        headerTitle: 'Permissions List',
        columns: columnsConfig,
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
            description: { label: 'Description', placeholder: 'Search by description...' },
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { navigate('/admin/permissions-create') }} type="primary" > Add </Button>
        ],
        request: async (params: PermissionListRequest) => {
            const requestParams: PermissionListRequest = {
                currentPage: params.currentPage || 1,
                perPage: params.perPage || 10,
                name: params.name,
                description: params.description,
            };
            const response: PermissionListResponse = await dispatch(GetPermissionsListThunk(requestParams)).unwrap();
            return {
                data: response?.data || [],
                total: response?.meta?.total || 0,
                success: true,
            }
        }
    };

    /**
     * List Config
     */
    const listPropsConfig = {
        formRef: formRef,
        actionRef: actionRef,
        headerTitle: 'Permissions List',
        actions: {
            title: 'Action',
            key: 'action',
            // responsive: ['md'],
            search: false,
            render: (_: any, record: { id: string }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Button onClick={() => showModal(record.id)} icon={<EyeOutlined />} key="view" color="primary" variant="outlined" />
                    <Button icon={<EditOutlined />} key="edit" color="primary" variant="outlined" /> {/* /admin/user/${record.key}/edit */}
                    <Button icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" /> {/* /admin/user/${record.key}/delete */}
                </div>
            ),
        },
        metas: {
            title: {
                title: 'Name',
                dataIndex: 'name',
                render: (_: string, record: { name: string, guard_name: string }) => {
                    return (
                        <React.Fragment>
                            <Typography style={{ fontWeight: "bold" }} >{record?.name}</Typography>
                        </React.Fragment>
                    )
                }
            },
            description: {
                title: 'Role Info',
                render: (_: string, record: { name: string, description: string }) => {
                    return (
                        <React.Fragment>
                            <Typography >Description: {record?.description}</Typography>
                        </React.Fragment>
                    )
                },
                search: false,
            },
        },
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
            description: { label: 'Description', placeholder: 'Search by description...' },
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { navigate('/admin/permissions-create') }} type="primary" > Add </Button>
        ],
        request: async (params: PermissionListRequest) => {
            const requestParams: PermissionListRequest = {
                currentPage: params.currentPage || 1,
                perPage: params.perPage || 10,
                name: params.name,
                description: params.description,
            };
            const response: PermissionListResponse = await dispatch(GetPermissionsListThunk(requestParams)).unwrap();
            return {
                data: response?.data || [],
                total: response?.meta?.total || 0,
                success: true,
            }
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>LaraStack CMS - Permissions</title>
            </Helmet>
            <AdminLayout {...PageContainerConfig}>
                <Row>
                    <Col span={24}>
                        {screens.lg ? (
                            <React.Fragment>
                                <TableData {...tablePropsConfig} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListData {...listPropsConfig} />
                            </React.Fragment>
                        )}
                    </Col>
                </Row>
            </AdminLayout>
            <UserProfileModal isOpen={open} onOk={handleOk} onCancel={handleCancel} userID={UserId}></UserProfileModal>
        </React.Fragment >
    );
};
export default PermissionList;