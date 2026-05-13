import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { LogoutThunk } from '@/redux/features/auth';

/**
 * Ant Design
 */
import { Layout, Menu } from 'antd';

/**
 * Config
 */
import { menuItemsSidebar } from '@/config/menuItem';

/**
 * Hooks
 */
import { useDeviceType } from "@/hooks/useDeviceType";
import { useRoles } from "@/hooks/useRole";



const { Sider } = Layout;

const SideBar: React.FC<{ activeKey: string, activeOpenKey: string[] }> = ({ activeKey, activeOpenKey }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const deviceInfo = useDeviceType();
    const { hasRole } = useRoles();

    const [collapsed, setCollapsed] = useState(!deviceInfo.isMobile ? false : true);

    const HandleLogout = async () => {
        try {
            await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (error) {
            console.log('Lỗi: ', error)
        }
    };


    const filteredMenu = menuItemsSidebar(HandleLogout).filter(item => {
        if (!item.access) return true;
        return hasRole(item.access);
    });

    const siderConfig = {
        theme: 'light' as const,
        collapsible: true,
        collapsed: collapsed,
        onCollapse: (value: boolean) => setCollapsed(value),
        collapsedWidth: deviceInfo.isMobile ? 0 : 80,
    }

    return (
        <React.Fragment>
            <Sider {...siderConfig} style={deviceInfo.isMobile ? { height: "100%", position: "fixed", left: 0, top: 64, zIndex: 999, } : undefined}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={[activeKey]} defaultOpenKeys={activeOpenKey} mode="inline" items={filteredMenu} />
            </Sider>
        </React.Fragment>
    )
}
export default SideBar