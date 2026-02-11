/* eslint-disable */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * Ant Design
 */
import { Breadcrumb, Layout, Row, Col, Calendar, theme, Alert, Typography, Avatar, Button, Form, Input, Select } from 'antd';

/**
 * Style
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/page/userCreation.scss';

/**
 *  Component
 */
import HeadersLayout from "@/components/dashboard/partials/Header.js";
import SideBar from "@/components/dashboard/partials/SideBar.js";
import Footer from "@/components/dashboard/partials/Footer.js";


const { Content } = Layout;
const UserPage = () => {
    const user = {
        name: 'Nguyen Duc',
        email: 'nguyenduc@example.com',
        role: 'Quản trị viên',
        createdAt: '05/04/2025',
        avatar: 'https://i.pravatar.cc/200?img=1'
    };
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

export default UserPage;