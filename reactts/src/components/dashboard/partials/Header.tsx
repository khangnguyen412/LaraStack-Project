/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Config
 */
import { menuItems, menuItemsMobile } from '@/config/menuItem.tsx';

/**
 * Ant Design
 */
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store.js';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutThunk, GetProfileThunk } from '@/redux/features/auth.ts';

/**
 * Style
 */
import '@/assets/scss/layout/header.scss';

const { Header } = Layout;

const HeaderLayout: React.FC = () => {
    /**
     * Hook
     */
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { useBreakpoint } = Grid;
    const breakpoints = useBreakpoint();
    const profile = useSelector((state: any) => state.auth?.data?.profile);

    /**
     * State
     */
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getProfileHandle = async () => {
        try {
            await dispatch(GetProfileThunk()).unwrap();
        } catch (err: any) {
            console.error("Lỗi:", err);
        }
    }

    const logoutHandle = async () => {
        try {
            await dispatch(LogoutThunk()).unwrap()
            navigate("/login", { replace: true })
        } catch (e) {
            console.log('Lỗi: ', e)
        }
    };

    useEffect(() => {
        getProfileHandle();
    }, [])

    return (
        <React.Fragment>
            <Header className="header-layout">
                <div className="header-logo">
                    <svg className="h-6 w-6 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="font-bold text-xl text-white">CMS Dashboard</span>
                </div>
                {breakpoints.xs ? (
                    <Button color="default" variant="outlined" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                ) : (
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={menuItems(profile, logoutHandle)} className="header-menu" />
                )}
            </Header>
            {breakpoints.xs && (
                <Drawer title={`Welcome, ${profile?.user_name}`} closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open} >
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['2']} items={menuItemsMobile(logoutHandle)} className="header-menu" />
                </Drawer>
            )}
        </React.Fragment>
    )
}
export default HeaderLayout