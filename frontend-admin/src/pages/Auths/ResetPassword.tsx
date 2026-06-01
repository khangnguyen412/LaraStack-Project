/* eslint-disable */
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/**
 *  Ant Design
*/
import { theme } from 'antd';
import { LockOutlined, } from '@ant-design/icons';
import { Form, Input, Button, Card, Alert, Typography, Divider } from 'antd';

/**
 *  Component
 */

/**
 * Assets
 */
import '@/assets/scss/page/login.scss';
import logo from '@/assets/images/logo-icon.png'

/**
 * Utils
 */
import { ErrorHandler } from "@/utils/errorHandler";

/**
 * Redux
 */
import { useDispatch } from 'react-redux';
import { ResetPasswordThunk } from "@/redux/features/auth";

/**
 * Type
*/
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { AppDispatch } from "@/redux/store";


/**
 * Login Page
 */
const ResetPasswordPage = () => {
    /**
     * Hook
     */
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get('token');
    const resetEmail = searchParams.get('email');

    /**
     * State
     */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>(undefined);

    const { Text, Title } = Typography;

    /**
     * On Finish Login Form
     * 
     * @param values 
     */
    const OnFinish = async (values: { email: string, token: string, password: string, confirmPassword: string }) => {
        setLoading(true);
        try {
            const params = {
                email: resetEmail!,
                token: resetToken!,
                password: values.password,
                confirmPassword: values.confirmPassword,
            };
            const response = await dispatch(ResetPasswordThunk(params)).unwrap();
            console.log(response);
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            console.log(err);
            if (typeof err.errors === 'string') {
                setError(err.errors);
            } else {
                // Error -> Show Alert Message
                const fieldErrors = ErrorHandler(err);
                // If has error, set to form
                if (Object.keys(fieldErrors).length > 0) {
                    const fields = Object.entries(fieldErrors).map(([name, errors]) => ({ name, errors: [errors], }));
                    form.setFields(fields);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    /**
     *  Login Form Field Props
     */
    const FieldProps: { size: SizeType; autoFocus: boolean; } = {
        size: 'large',
        autoFocus: true,
    };

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
                            Reset Password
                        </Text>
                    </div>

                    <Form form={form} name="login" onFinish={OnFinish} layout="vertical" size="large" requiredMark={false} className="login-form">
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input.Password {...FieldProps} prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please input your confirm password!' }]} >
                            <Input.Password {...FieldProps} prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                                Reset Password
                            </Button>
                        </Form.Item>

                        {message && (<Alert message="Forgot password" description={message} type="success" showIcon />)}
                        {error && (<Alert message="Forgot password" description={error} type="error" showIcon />)}
                        <Divider />
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

export default ResetPasswordPage;