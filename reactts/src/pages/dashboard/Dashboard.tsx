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
import { Breadcrumb, Layout, Row, Col, Calendar, theme, Alert, Typography, Avatar, Button, } from 'antd';
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
import SideBar from "@/components/dashboard/partials/SideBar";
import HeaderLayout from "@/components/dashboard/partials/Header";
import FooterLayout from "@/components/dashboard/partials/Footer";
import { Loading } from '@/components/Loading.tsx'

const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const { Content } = Layout;
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

    return (
        <React.Fragment>
            <Loading IsLoading={loading} FlexLoading={true} />
            <HeaderLayout></HeaderLayout>
            <Layout className="layout-wrapper">
                <SideBar activeKey={'dashboard'} activeOpenKey={['dashboard']}></SideBar>
                <Layout>
                    <Content className="layout-wrapper--margin">
                        <Breadcrumb className="container-wrapper" items={[{ title: 'Admin' }, { title: 'Dashboard' }]} />
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
                    </Content>
                    <FooterLayout></FooterLayout>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}
export default AdminDashboard 