/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  Ant Design
*/
import { theme } from 'antd';
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Card, Alert, Typography, Flex, Divider } from 'antd';

/**
 *  Component
 */
import { ForgotPassBtn } from "@/components/Layout/FormLogin";

/**
 * Assets
 */
import '@/assets/scss/page/login.scss';
import logo from '@/assets/images/logo-icon.png'

/**
 * Utils
 */
import { ErrorHandler, formatErrorMessage } from "@/utils/errorHandler";

/**
 * Redux
 */
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunk, CheckAuthThunk } from "@/redux/features/auth";

/**
 * Type
*/
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { AppDispatch } from "@/redux/store";
import type { LoginType } from "@/types/login.type";

/**
 * Login Page
 */
const LoginPage = () => {
    /**
     * Hook
     */
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const check = useSelector((state: any) => state.auth?.check);
    const data = useSelector((state: any) => state.auth?.data);
    const loading = useSelector((state: any) => state.auth?.loading);
    const error = useSelector((state: any) => state.auth?.error);

    const { Text, Title } = Typography;

    const checkAuthHandle = async () => {
        try {
            await dispatch(CheckAuthThunk())
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * On Finish Login Form
     * 
     * @param values 
     */
    const OnFinish = async (values: LoginType) => {
        try {
            await dispatch(LoginThunk(values)).unwrap();
            // Success -> Redirect to Admin Dashboard
        } catch (err) {
            // Error -> Show Alert Message
            const fieldErrors = ErrorHandler(err);

            // if has error, set to form
            if (Object.keys(fieldErrors).length > 0) {
                const fields = Object.entries(fieldErrors).map(([name, errors]) => ({ name, errors: [errors], }));
                form.setFields(fields);
            }
        }
    }

    /**
     *  Login Form Field Props
     */
    const FieldProps: { size: SizeType; autoFocus: boolean; } = {
        size: 'large',
        autoFocus: true,
    };

    useEffect(() => {
        if (localStorage.getItem("profile")) {
            navigate("/admin");
        }
        if (data) {
            localStorage.setItem("profile", JSON.stringify(data));
            navigate("/admin");
        }
    }, [data, navigate])

    useEffect(() => {
        if (localStorage.getItem("profile")) {
            checkAuthHandle()
        }
    }, [check])

    return (
        <React.Fragment>
            {/* Video Background */}
            <video className="video-background" autoPlay loop muted playsInline src="https://videos.pexels.com/video-files/8201470/8201470-uhd_2560_1440_30fps.mp4" />
            <div className="overlay" />

            {/* Login Form */}
            <div className="login-page">
                <Card className="login-card">
                    <div className="login-header">
                        <div className="logo">
                            <img src={logo} alt="Logo" />
                        </div>
                        <Title level={2} className="title" style={{ color: token.colorText }}>
                            Welcome to CMS System
                        </Title>
                        <Text className="subtitle" style={{ color: token.colorTextSecondary }}>
                            Sign In
                        </Text>
                    </div>

                    <Form form={form} name="login" onFinish={OnFinish} layout="vertical" size="large" requiredMark={false} className="login-form">
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username or email!' }]} >
                            <Input {...FieldProps} prefix={<UserOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Username or Email" />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input.Password {...FieldProps} prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Form.Item name="autoLogin" valuePropName="checked" noStyle>
                                <Checkbox>Remember Password</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                                Login
                            </Button>
                        </Form.Item>

                        {error && (<Alert message="Login failed" description={formatErrorMessage(error)} type="error" showIcon />)}

                        <Divider />

                        <Flex justify="center">
                            <ForgotPassBtn error={null} />
                        </Flex>
                    </Form>

                    <div className="login-footer">
                        <Text style={{ color: token.colorTextSecondary }}>
                            © 2025 CMS System. All rights reserved.
                        </Text>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );

}

export default LoginPage;