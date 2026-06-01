import React from "react";

/**
 * Style
*/
import "@/assets/scss/style.scss";
import "@/assets/scss/page/login.scss";

/**
 *  Component
 */
import { Error } from '@/components/Error';

export const ForgotPassBtn: React.FC<{ error: string | null }> = ({ error }) => {

    return (
        <React.Fragment>
            <Error Error={error}></Error>
            <div className="forgot-pass-btn">
                <a href="/password/forgot">Forgot Password?</a>
            </div>
        </React.Fragment>
    )
}