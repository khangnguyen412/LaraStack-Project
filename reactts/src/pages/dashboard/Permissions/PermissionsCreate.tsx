import React from "react";

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Row, Col, Typography } from 'antd';

/**
 * Style
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/page/userCreation.scss';

/**
 *  Component
 */
import HeadersLayout from "@/components/dashboard/partials/Header";
import SideBar from "@/components/dashboard/partials/SideBar";
import Footer from "@/components/dashboard/partials/Footer";


const { Content } = Layout;
const UserCreate: React.FC = () => {
    return (
        <React.Fragment>
            <HeadersLayout></HeadersLayout>
            <Layout className="layout-wrapper">
                <SideBar activeKey={'users-creation'} activeOpenKey={['users']}></SideBar>
                <Layout>
                    <Content className="container-wrapper">
                        <Breadcrumb className="layout-wrapper--margin" items={[{ title: 'User' }, { title: 'User Creation' }]} />
                        <Row className="userCreation-container">
                            <Col md={24} lg={24} className="userCreation-col">
                                <div className="userCreation-col-content">
                                    <Typography.Title level={2} className="container-title">User Create</Typography.Title>
                                </div>
                                
                            </Col>
                        </Row>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

export default UserCreate;