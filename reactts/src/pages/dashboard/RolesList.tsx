/* eslint-disable */
import React, { useState, useMemo, useRef } from 'react';

/**
 * Ant Design
 */
import { Grid, Row, Col, Typography, Tag, Space, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
/**
 * Component
*/
import UserProfileModal from "@/components/dashboard/UsersProfileModal.jsx";
import AdminLayout from "@/components/dashboard/layout/AdminLayout";
import { TableData } from "@/components/dashboard/partials/TableData";
import { ListData } from "@/components/dashboard/partials/ListData";

/**
 * Redux
 */
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { GetRolesListThunk } from '@/redux/features/roles';

/**
 * Style
*/
import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

const RoleList: React.FC = () => {
    /**
     * Hook
     */
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const actionRef = useRef<any>(null);
    const formRef = useRef<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: any) => state.roles.data);

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
        SideBarActiveKey: 'roles-list',
        SideBarActiveOpenKey: ['access-control'],
        HeaderTitle: undefined,
        BreadcrumbItems: {
            items: [
                { title: 'Access Control', path: '/admin' },
                { title: 'Role List' },
            ],
        },
    };

    /**
     * Column Config
     */
    const columnsConfig: any = [
        {
            title: 'id',
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
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            search: true,
            formItemProps: { label: "Description" },
            fieldProps: { placeholder: "Search by description..." },
            render: (text: string) => <Typography.Text>{text}</Typography.Text>,
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

    /**
     * Table Config
     */
    const tablePropsConfig = {
        actionRef: actionRef,
        formRef: formRef,
        rowKey: 'id',
        headerTitle: 'Roles List',
        columns: columnsConfig,
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
            description: { label: 'Description', placeholder: 'Search by description...' },
        },
        request: async (params: any, sort: any, filter: any) => {
            const response = await dispatch(GetRolesListThunk()).unwrap();
            return {
                data: response?.data?.roles_list || [],
                // total: response?.total || 0,
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
        headerTitle: 'Roles List',
        actions: {
            title: 'Action',
            key: 'action',
            search: false,
            render: (_: any, record: { id: string }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Button onClick={() => showModal(record.id)} icon={<EyeOutlined />} key="view" color="primary" variant="outlined" />
                    <Button icon={<EditOutlined />} key="edit" color="primary" variant="outlined" /> {/* /admin/user/${record.key}/edit */}
                    <Button icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" /> {/* /admin/user/${record.key}/delete */}
                </div>
            ),
        },
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
            description: { label: 'Description', placeholder: 'Search by description...' },
        },
        metas: {
            title: {
                title: 'Name',
                dataIndex: 'name',
                render: (text: string, record: { name: string, description: string }) => {
                    return (
                        <React.Fragment>
                            <Typography style={{ fontWeight: "bold" }} >{record?.name}</Typography>
                        </React.Fragment>
                    )
                }
            },
            description: {
                title: 'Role Info',
                render: (text: string, record: { name: string, description: string }) => {
                    return (
                        <React.Fragment>
                            <Typography >Guard Name: {record?.description}</Typography>
                        </React.Fragment>
                    )
                },
                search: false,
            },
        },
        request: async (params: any) => {
            const response = await dispatch(GetRolesListThunk()).unwrap();
            return {
                data: response?.data?.roles_list || [],
                // total: response?.total || 0,
                success: true,
            }
        }
    }

    return (
        <React.Fragment>
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
export default RoleList;