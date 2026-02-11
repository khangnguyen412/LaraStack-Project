/* eslint-disable */
import React, { useState, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';

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
import { GetRolesListThunk } from '@/redux/features/roles';

/**
 * Style
 */
import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

const UserRole = () => {
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const dispatch = useDispatch();

    /**
     * User Data
     */
    const getRolesList = async () => {
        try {
            const response = await dispatch(GetRolesListThunk()).unwrap();
            console.log(response);
            if (response?.data) return response
        } catch (error) {
            console.log(error)
        }
    }

    const [open, setOpen] = useState(false);
    const [UserId, SetUserId] = useState(null)
    const showModal = (id) => {
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
        SideBarActiveKey: 'users-role',
        SideBarActiveOpenKey: 'users',
        HeaderTitle: 'Users Role',
        BreadcrumbItems: {
            items: [
                { title: 'Users', path: '/admin' },
                { title: 'Users Role' },
            ],
        },
    };

    /**
     * Search Config
     */
    const searchConfig = {
        name: { label: 'Name', placeholder: 'Search by name...' },
        guard_name: { label: 'Guard Name', placeholder: 'Search by guard name...' },
    };

    /**
     * Table Config
     */
    const columnsConfig = [
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
            formItemProps: { label: searchConfig.name.label },
            fieldProps: { placeholder: searchConfig.name.placeholder },
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Guard Name',
            dataIndex: 'guard_name',
            key: 'guard_name',
            search: true,
            formItemProps: { label: searchConfig.guard_name.label },
            fieldProps: { placeholder: searchConfig.guard_name.placeholder },
            render: (text, record) => <Typography.Text>{text}</Typography.Text>,
        },
        // {
        //     title: 'Permissions',
        //     dataIndex: 'permissions',
        //     key: 'permissions',
        //     search: false,
        //     render: (role) => {
        //         let colorRole = ''
        //         if (role.id === 1) { colorRole = 'volcano'; }
        //         else if (role.id === 2) { colorRole = 'blue'; }
        //         else if (role.id === 3) { colorRole = 'green'; }
        //         return (
        //             <Tag color={'blue'} key={role.id}> {role.name} </Tag>
        //         )
        //     },
        // },
        {
            title: 'Action',
            key: 'action',
            responsive: ['md'],
            search: false,
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record.id)} icon={<EyeOutlined />} key="view" color="info" variant="outlined" />
                    <Button to={{/* /admin/user/${record.key}/edit */ }} icon={<EditOutlined />} key="edit" color="primary" variant="outlined" />
                    <Button to={{/* /admin/user/${record.key}/delete */ }} icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" />
                </Space>
            ),
        },
    ]

    const actionRef = useRef();
    const formRef = useRef();
    const tablePropsConfig = {
        actionRef: actionRef,
        formRef: formRef,
        rowKey: 'id',
        headerTitle: 'Roles List',
        columns: columnsConfig,
        request: async (params, sort, filter) => {
            const response = await getRolesList();
            return {
                data: response?.data || [],
                total: response?.total || 0,
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
        metas: {
            title: {
                title: 'Name',
                dataIndex: 'name',
                render: (text, record) => {
                    return (
                        <React.Fragment>
                            <Typography level={3} style={{ fontWeight: "bold" }} >{record?.name}</Typography>
                        </React.Fragment>
                    )
                }
            },
            description: {
                title: 'Role Info',
                render: (text, record) => {
                    return (
                        <React.Fragment>
                            <Typography level={3}>Guard Name: {record?.guard_name}</Typography>
                        </React.Fragment>
                    )
                },
                search: false,
            },
        },
        request: async (params) => {
            const response = await getRolesList();
            return {
                data: response?.data || [],
                total: response?.total || 0,
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
            {/* <UserProfileModal isOpen={open} onOk={handleOk} onCancel={handleCancel} userID={UserId}></UserProfileModal> */}
        </React.Fragment >
    );
};
export default UserRole;