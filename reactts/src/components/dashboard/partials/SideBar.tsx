/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import { LogoutThunk } from '@/redux/features/auth.ts';

/**
 * Ant Design
 */
import { Layout, Menu, Grid } from 'antd';

/**
 * Config
 */
import { menuItemsSidebar } from '@/config/menuItem.tsx';

const { Sider } = Layout;

const SideBar: React.FC<{ activeKey: string, activeOpenKey: string[] }> = ({ activeKey, activeOpenKey }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);

    const HandleLogout = async () => {
        try {
            await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (error) {
            console.log('Lỗi: ', error)
        }
    };

    const menuItems = menuItemsSidebar(HandleLogout);

    return (
        <React.Fragment>
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={value => setCollapsed(value)} collapsedWidth={!screens.md ? 0 : 80}
                style={!screens.md ? { height: "100%", position: "fixed", left: 0, top: 64, zIndex: 999, } : undefined}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" defaultSelectedKeys={[activeKey]} defaultOpenKeys={activeOpenKey} mode="inline" items={menuItems} />
            </Sider>
        </React.Fragment>
    )
}
export default SideBar