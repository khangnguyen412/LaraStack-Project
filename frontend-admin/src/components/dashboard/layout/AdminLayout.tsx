import React from "react";
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
import SideBar from "@/components/dashboard/partials/SideBar";
import HeaderLayout from "@/components/dashboard/partials/Header";
import FooterLayout from "@/components/dashboard/partials/Footer";

/**
 * Hooks
 */
import { useDeviceType } from "@/hooks/useDeviceType";

/**
 * Type
 */
type AdminDashboardProps = {
    SideBarActiveKey: string;
    SideBarActiveOpenKey: string[];
    HeaderTitle?: string;
    BreadcrumbItems?: {
        items: { path?: string; title: string }[];
    };
    children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ SideBarActiveKey, SideBarActiveOpenKey, HeaderTitle, BreadcrumbItems, children }) => {
    /**
     * Hooks
     */
    const deviceInfo = useDeviceType();

    const PageContainerConfig = {
        title: HeaderTitle || '',
        ghost: true,
        breadcrumb: {
            items: BreadcrumbItems?.items.map(({ path, title }) => ({
                title: path ? <Link to={path}>{title}</Link> : title,
            })),
        },
        childrenContentStyle: deviceInfo.isMobile ? { paddingInline: 0, paddingBlock: 0, margin: 10 } : {}, // force style for div children
    };

    return (
        <React.Fragment>
            <HeaderLayout></HeaderLayout>
            <Layout className="layout-wrapper">
                <SideBar activeKey={SideBarActiveKey} activeOpenKey={!deviceInfo.isMobile ? SideBarActiveOpenKey : []} ></SideBar>
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