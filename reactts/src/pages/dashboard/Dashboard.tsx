/* eslint-disable */
import React, { useState } from "react";

/**
 * Redux
 */
import { useSelector } from 'react-redux';

/**
 * Dayjs
 */
import dayjs from 'dayjs';

/**
 * Ant Design
 */
import { Row, Col, Calendar, Alert, Typography, Avatar, Button, } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

/**
 * Style
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/button.scss';
import '@/assets/scss/page/dashboard.scss'

/**
 * Components
 */
import AdminLayout from "@/components/dashboard/layout/AdminLayout";
import { Loading } from '@/components/Loading'

const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const { Title, Text } = Typography;

/**
 * Admin Dashboard
 */
const AdminDashboard: React.FC = () => {
    /**
     * Hook
     */
    const loading = useSelector((state: any) => state.auth?.loading);
    const profile = useSelector((state: any) => state.auth?.data?.profile);

    /**
     * State
     */
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());

    /**
     * OnSelect
     * @param newValue dayjs.Dayjs
     */
    const onSelect = (newValue: dayjs.Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    /**
     * Page Container Config
     */
    const PageContainerConfig = {
        SideBarActiveKey: 'dashboard',
        SideBarActiveOpenKey: ['dashboard'],
        HeaderTitle: undefined,
        BreadcrumbItems: {
            items: [
                { title: 'Admin', path: '/admin' },
                { title: 'Dashboard' },
            ],
        },
    };

    return (
        <React.Fragment>
            <Loading IsLoading={loading} FlexLoading={true} />
            <AdminLayout {...PageContainerConfig}>
                <Row className="dashboard-container">
                    <Col md={24} lg={12} className="dashboard-col">
                        <div className="dashboard-col-wrapper">
                            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
                            <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
                        </div>
                    </Col>
                    <Col md={24} lg={12} className="dashboard-col">
                        <div className="dashboard-col-wrapper">
                            <Title level={2} className="container-title">User Infomation</Title>
                            {profile && (
                                <React.Fragment>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <Avatar size={150} icon={<UserOutlined />}></Avatar>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Name: </Text>
                                            <Text>{profile?.display_name ?? "N/A"}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Email: </Text>
                                            <Text>{profile?.email ?? "N/A"}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Phone: </Text>
                                            <Text>{profile?.phone ?? "N/A"}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Address: </Text>
                                            <Text>{profile?.address ?? "N/A"}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Role: </Text>
                                            <Text>{profile?.roles?.name ?? "N/A"}</Text>
                                        </Col>
                                    </Row>
                                    <Row id="edit-profile-btn">
                                        <Button type="primary" size="large" icon={<EditOutlined />} className="linear-gradient-btn">Edit Profile</Button>
                                    </Row>
                                </React.Fragment>
                            )}
                        </div>
                    </Col>
                </Row>
            </AdminLayout>
        </React.Fragment>
    )
}
export default AdminDashboard 