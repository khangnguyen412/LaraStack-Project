/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import type { ColumnsType } from 'antd/es/table';
import { Breadcrumb, Layout, Grid, Table, Card, Row, Col, } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

/**
 * Component
*/
import SideBar from "@/components/dashboard/partials/SideBar.js";
import UserProfileModal from "@/components/dashboard/UsersProfileModal.js";
import HeaderLayout from "@/components/dashboard/partials/Header.js";
import FooterLayout from "@/components/dashboard/partials/Footer.js";
import { Loading } from '@/components/Loading.js'

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserListAdminThunk } from '@/redux/features/user';

/**
 * Config
 */
import { columns } from '@/config/columnTable.js';

/**
 * Style
 */

import "@/assets/scss/style.scss";
import "@/assets/scss/page/userList.scss";

/**
 * type 
 */

const { Content } = Layout;

const CardAction = (item: { key: string }, showModal: (id: string) => void) => [
    <EyeOutlined key="view" onClick={() => showModal(item.key)} />,
    <Link to={`/admin/user/${item.key}/edit`}><EditOutlined key="edit" /></Link>,
    <Link to={`/admin/user/${item.key}/delete`}><DeleteOutlined key="delete" /></Link>,
]

const UserList = () => {
    /**
     * Hook
     */
    const dispatch = useDispatch<AppDispatch>();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const userAdminList = useSelector((state: any) => state.user?.data?.users_list);

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
        console.log(uuid)
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
     * Columns config
     */
    const columnsConfig: ColumnsType<{
        key: string;
        uuid: string;
        display_name: string;
        username: string;
        address: string;
        email: string;
        role: string;
    }> = columns(showModal);


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
            <Layout style={{ height: 'auto' }}>
                <HeaderLayout></HeaderLayout>
                <Layout className='layout-wrapper' >
                    <SideBar activeKey={'users-list'} activeOpenKey={['users']}></SideBar>
                    <Layout>
                        <Content className='layout-wrapper--margin userlist-container' >
                            <Breadcrumb className='container-wrapper userlist-breadcrumb' items={[{ title: 'User' }, { title: 'User List' }]} />
                            <Row className='container-wrapper userlist-table'>
                                <Col className='userlist-table-col' span={24}>
                                    {screens.lg ? (
                                        <React.Fragment>
                                            <Table columns={columnsConfig} dataSource={userAdminList} pagination={false} loading={false} scroll={{ x: true, y: undefined }}  rowKey="uuid"/>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {Array.isArray(userAdminList) && userAdminList?.map((item: any) => (
                                                <Card key={item.key} style={{ marginBottom: 8 }} actions={CardAction(item, showModal)}>
                                                    <p><b>Tên:</b> {item.display_name}</p>
                                                    <p><b>Username:</b> {item.username}</p>
                                                    <p><b>Email:</b> {item.email}</p>
                                                    <p><b>Address:</b> {item.address}</p>
                                                    <p><b>Role:</b> {item.roles.name}</p>
                                                </Card>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </Col>
                            </Row>
                        </Content>
                        <FooterLayout></FooterLayout>
                    </Layout>
                </Layout>
            </Layout>
            <UserProfileModal isOpen={open} onOk={onOk} onCancel={onCancel} userID={UserId}></UserProfileModal>
        </React.Fragment>
    );
};
export default UserList;