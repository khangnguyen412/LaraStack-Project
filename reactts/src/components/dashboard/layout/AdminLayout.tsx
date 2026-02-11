/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

/**
 * Ant Design
 */
import { Layout } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

/**
 * Style
 */
import '@/assets/scss/style.scss';
import '@/assets/scss/button.scss';
import '@/assets/scss/page/dashboard.scss'

/**
 * Components
 */
import SideBar from "@/components/dashboard/partials/SideBar.jsx";
import HeaderLayout from "@/components/dashboard/partials/Header.jsx";
import FooterLayout from "@/components/dashboard/partials/Footer.jsx";
import { Loading } from '@/components/Loading.jsx'

const AdminDashboard = ({ SideBarActiveKey, SideBarActiveOpenKey, HeaderTitle, BreadcrumbItems, children }) => {
    const PageContainerConfig = {
        title: HeaderTitle || '',
        breadcrumb: {
            items: BreadcrumbItems?.items.map((it) => ({
                title: it.path ? <Link to={it.path}>{it.title}</Link> : it.title,
            })),
        },
    };

    return (
        <React.Fragment>
            <HeaderLayout></HeaderLayout>
            <Layout className="layout-wrapper">
                <SideBar activeKey={SideBarActiveKey} activeOpenKey={SideBarActiveOpenKey || ''}></SideBar>
                <Layout>
                    <PageContainer {...PageContainerConfig}>
                        {children}
                        <FooterLayout></FooterLayout>
                    </PageContainer>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}
export default AdminDashboard 