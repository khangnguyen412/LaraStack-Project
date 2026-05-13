/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Config
 */
import { menuItems, menuItemsMobile } from '@/config/menuItem';

/**
 * Ant Design
 */
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutThunk, GetProfileThunk } from '@/redux/features/auth';

/**
 * Assets
 */
import '@/assets/scss/layout/header.scss';
import logo from '@/assets/images/logo-icon-white.png'

const { Header } = Layout;

const HeaderLayout: React.FC = () => {
    /**
     * Hook
     */
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { useBreakpoint } = Grid;
    const breakpoints = useBreakpoint();
    const profile = useSelector((state: any) => state.auth?.data || null);

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
                    <img src={logo} alt="Logo" className="h-8 w-8 mr-1 text-white"/>
                    <span className="font-bold text-xl text-white">LaraStack CMS</span>
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