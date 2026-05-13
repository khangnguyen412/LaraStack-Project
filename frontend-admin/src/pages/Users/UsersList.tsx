/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Ant Design
 */
import { Grid, Row, Col, Typography, Tag, Space, Button, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Component
*/
import AdminLayout from "@/components/Layout/AdminLayout";
import UserProfileModal from "@/components/Users/UsersProfileModal";
import { TableData } from "@/components/Partials/TableData";
import { ListData } from "@/components/Partials/ListData";
import { Loading } from '@/components/Loading.js'
import type { ProColumns } from '@ant-design/pro-table';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import type { PresetColorType } from 'antd/es/_util/colors';
import type { LiteralUnion } from 'antd/es/_util/type';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserListAdminThunk } from '@/redux/features/user';

/**
 * Config
 */
import { color } from '@/constants/tagProps';

/**
 * Style
 */

import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

/**
 * type 
 */
const CardAction = (item: { key: string }, showModal: (id: string) => void) => [
    <EyeOutlined key="view" onClick={() => showModal(item.key)} />,
    <Link to={`/admin/user/${item.key}/edit`}><EditOutlined key="edit" /></Link>,
    <Link to={`/admin/user/${item.key}/delete`}><DeleteOutlined key="delete" /></Link>,
]

const UserList: React.FC = () => {
    /**
     * Hook
     */
    const actionRef = useRef<any>(null);
    const formRef = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    /**
     * State
    */
    const [open, setOpen] = useState(false);
    const [IsLoading, SetLoading] = useState(false)
    const [UserId, SetUserId] = useState<string>()

    /**
     * Open Modal
     * @param uuid - User ID
     */
    const showModal = (uuid: string) => {
        SetUserId(uuid)
        setOpen(true);
    };

    /**
     * Close Modal
     */
    const onOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    /**
     * Cancel Modal
     */
    const onCancel = () => {
        setOpen(false);
    };

    /**

     * Get User List
     */
    const getUserList = async () => {
        try {
            await dispatch(GetUserListAdminThunk("")).unwrap();
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'users-list',
        SideBarActiveOpenKey: ['users'],
        HeaderTitle: 'User List',
        BreadcrumbItems: {
            items: [
                { title: 'Users ', path: '/admin' },
                { title: 'Users List' },
            ],
        },
    };

    /**
     * Columns config
     */
    const columnsConfig: ProColumns<any>[] = [
        {
            title: 'ID',
            dataIndex: 'uuid',
            key: 'uuid',
            hidden: true,
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (_dom: any, record: { id: string; display_name: string }) => <Link onClick={() => { showModal(record.id) }} to={``}>{record.display_name}</Link>,
        },
        {
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
            render: (_dom: any, record: { id: string; user_name: string }) => <Link onClick={() => { showModal(record.id) }} to={``}>{record.user_name}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (_dom: any, record: { address: string }) => <span>{record.address}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: (_dom: any, record: { roles: { id: number; name: string } }) => <Tag color={color({ roles: record.roles }) as LiteralUnion<PresetColorType, string>} key={record.roles?.id}> {record.roles?.name} </Tag>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            responsive: ['md'] as Breakpoint[], // Ép kiểu ở đây,
            search: false,
            render: (_dom: any) => (
                <Space size="small">
                    <Button icon={<EditOutlined />} key="edit" color="primary" variant="outlined" /> {/* /admin/user/${record.key}/edit */}
                    <Button icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" /> {/* /admin/user/${record.key}/delete */}
                </Space>
            ),
        },
    ];

    /**
     * Table Props Config
     */
    const tablePropsConfig = {
        actionRef: actionRef,
        formRef: formRef,
        rowKey: 'id',
        headerTitle: 'Users List',
        columns: columnsConfig,
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
            description: { label: 'Description', placeholder: 'Search by description...' },
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { navigate('/admin/users-create') }} type="primary" > Add </Button>
        ],
        request: async (_: any) => {
            const response = await dispatch(GetUserListAdminThunk("")).unwrap();
            return {
                data: response?.data || [],
                total: response?.data?.total || 0,
                success: true,
            }
        }
    };

    /**
     * List Props Config
     */
    const listPropsConfig = {
        formRef: formRef,
        actionRef: actionRef,
        headerTitle: 'Permissions List',
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
        metas: {
            title: {
                title: 'Name',
                dataIndex: 'name',
                render: (_: string, record: { display_name: string }) => {
                    return (
                        <React.Fragment>
                            <Typography style={{ fontWeight: "bold" }} >{record?.display_name}</Typography>
                        </React.Fragment>
                    )
                }
            },
            description: {
                title: 'Info',
                render: (_: string, record: { user_name: string, email: string, address: string, roles: { name: string } }) => {
                    return (
                        <React.Fragment>
                            <Typography >Username: {record?.user_name}</Typography>
                            <Typography >Email: {record?.email}</Typography>
                            <Typography >Address: {record?.address}</Typography>
                            <Typography >Role: {record?.roles?.name}</Typography>
                        </React.Fragment>
                    )
                },
                search: false,
            },
        },
        searchConfig: {
            name: { label: 'Name', placeholder: 'Search by name...' },
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { navigate('/admin/users-create') }} type="primary" > Add </Button>
        ],
        request: async (_: any) => {
            const response = await dispatch(GetUserListAdminThunk("")).unwrap();
            return {
                data: response?.data || [],
                // total: response?.total || 0,
                success: true,
            }
        }
    }

    useEffect(() => {
        try {
            SetLoading(true);
            getUserList();
        } catch (error) {
            console.log(error)
        } finally {
            SetLoading(false)
        }
    }, []);

    return (
        <React.Fragment>
            <Loading IsLoading={IsLoading} FlexLoading={true}></Loading>
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
            <UserProfileModal isOpen={open} onOk={onOk} onCancel={onCancel} userID={UserId}></UserProfileModal>
        </React.Fragment>
    );
};
export default UserList;