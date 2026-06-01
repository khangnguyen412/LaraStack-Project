import React from "react";

/**
 *  Ant Design
*/
import { theme } from 'antd';
import { UserOutlined, } from '@ant-design/icons';
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
import { ErrorHandler, formatErrorMessage } from "@/utils/errorHandler";

/**
 * Redux
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { ForgotPasswordThunk } from "@/redux/features/auth";

/**
 * Type
*/
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { AppDispatch } from "@/redux/store";

/**
 * Login Page
 */
const ForgotPasswordPage = () => {
    /**
     * Hook
     */
    const { token } = theme.useToken();
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const message = useSelector((state: RootState) => state.auth?.message);
    const loading = useSelector((state: RootState) => state.auth?.loading);
    const error = useSelector((state: RootState) => state.auth?.error);

    const { Text, Title } = Typography;

    /**
     * On Finish Login Form
     * 
     * @param values 
     */
    const OnFinish = async (values: {email: string}) => {
        try {
            await dispatch(ForgotPasswordThunk(values)).unwrap();
        } catch (err) {
            // Error -> Show Alert Message
            const fieldErrors = ErrorHandler(err);

            // If has error, set to form
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
                            Forgot Password
                        </Text>
                    </div>

                    <Form form={form} name="login" onFinish={OnFinish} layout="vertical" size="large" requiredMark={false} className="login-form">
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]} >
                            <Input {...FieldProps} prefix={<UserOutlined style={{ color: token.colorTextSecondary }} />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                                Forgot Password
                            </Button>
                        </Form.Item>

                        {message && (<Alert message="Forgot password" description={message} type="success" showIcon />)}
                        {error && (<Alert message="Failed" description={formatErrorMessage(error)} type="error" showIcon />)}
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

export default ForgotPasswordPage;