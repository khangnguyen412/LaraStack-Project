/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  Ant Design
*/
import { theme } from 'antd';
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';


/**
 *  Component
 */
import { Description, ButtonViewSource, ForgotPassBtn } from "@/components/user/FormLogin";
import { Loading } from '@/components/Loading'

/**
 * Image
 */
import BackgroundImage from "@/assets/images/login-background.png";

/**
 * Style
 */
import '@/assets/scss/page/login.scss';

/**
 * Redux
 */
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunk } from "@/redux/features/auth";

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
    const check = useSelector((state: any) => state.auth?.check);
    const data = useSelector((state: any) => state.auth?.data);
    const loading = useSelector((state: any) => state.auth?.loading);
    const error = useSelector((state: any) => state.auth?.error);

    /**
     * On Finish Login Form
     * 
     * @param values 
     */
    const OnFinish = async (values: LoginType) => {
        try {
            await dispatch(LoginThunk(values));
        } catch (error) {
            console.log(error);
        }
    }

    /**
     *  Login Form Field Props
     */
    const FieldProps: { size: SizeType; autoFocus: boolean; } = {
        size: 'large',
        autoFocus: true,
    };

    /**
     *  Login Form Props
     */
    const LoginFormProps = {
        backgroundImageUrl: BackgroundImage,
        backgroundVideoUrl: "https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr",
        logo: "",
        title: "Welcome to CMS System",
        subTitle: "Sign In",
        activityConfig: {
            title: 'CMS System',
            subTitle: <Description></Description>,
            action: <ButtonViewSource></ButtonViewSource>,
        },
        submitter: {
            searchConfig: {
                submitText: 'Login',
            },
        },
    }

    useEffect(() => {
        if (localStorage.getItem("token") && check) {
            navigate("/admin");
        }
        if (data?.token && data?.profile) {
            localStorage.setItem("token", data?.token);
            localStorage.setItem("profile", JSON.stringify(data?.profile));
            localStorage.setItem("permissions", JSON.stringify(data?.permissions));
            navigate("/admin");
        }
    }, [data, navigate])

    return (
        <React.Fragment>
            <LoginFormPage {...LoginFormProps} onFinish={OnFinish} actions={<ForgotPassBtn error={error}></ForgotPassBtn>} style={{ minHeight: '100dvh' }}>
                <React.Fragment>
                    <ProFormText name="username" fieldProps={{ ...FieldProps, prefix: (<UserOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Username or Email'} rules={[{ required: true, message: 'Please input your username or email!', },]} />
                    <ProFormText.Password name="password" fieldProps={{ ...FieldProps, prefix: (<LockOutlined style={{ color: token.colorText, }} className={'prefixIcon'} />), }} placeholder={'Password'} rules={[{ required: true, message: 'Please input your password!', },]} />
                </React.Fragment>
                <div style={{ marginBlockEnd: 24, }} >
                    <ProFormCheckbox noStyle name="autoLogin">
                        Remember Password
                    </ProFormCheckbox>
                </div>
            </LoginFormPage>
            <Loading IsLoading={loading} FlexLoading={false}></Loading>
        </React.Fragment>
    )
}

export default LoginPage;