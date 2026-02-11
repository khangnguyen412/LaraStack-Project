/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";


/**
 *  Ant Design
*/
import { Button, theme } from 'antd';

/**
 * Style
*/
import "@/assets/scss/style.scss";
import "@/assets/scss/page/login.scss";

/**
 *  Component
 */
import { Error } from '@/components/Error.tsx';

export const ForgotPassBtn: React.FC<{ error: string | null }> = ({ error }) => {

    return (
        <React.Fragment>
            <Error Error={error}></Error>
            <div className="forgot-pass-btn">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </React.Fragment>
    )
}

export const Description = () => {
    return (
        <React.Fragment>
            <div className="flex flex-col w-full">
                <span className="font-bold c-primary-color">Language:</span>
                <span>Php (8.x),Javascript, Mysql (8.x)</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <span className="font-bold c-primary-color">Framework used in this project:</span>
                <span>ReactJs, Tailwind CSS (3.x), Laravel (10.x)</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <span className="font-bold c-primary-color">Tool used in this project:</span>
                <span>Docker, Postman, DBeaver, MySQL Workbench</span>
            </div>
            <div className="flex flex-col w-full mt-4">
                <p className="font-bold c-primary-color">
                    This is CMS System was developed by Q.Khang. Source was published on My GitHub.
                </p>
            </div>
        </React.Fragment>
    )
}

export const ButtonViewSource = () => {
    const { token } = theme.useToken();
    return (
        <React.Fragment>
            <Link to="https://github.com/khangnguyen412/Laravel-React-Project">
                <Button size="large" style={{ borderRadius: 20, background: token.colorBgElevated, color: token.colorPrimary, width: 120, }} >
                    Visit GitHub
                </Button>
            </Link>
        </React.Fragment>
    )
}