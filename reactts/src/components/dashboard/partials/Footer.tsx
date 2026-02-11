/* eslint-disable */
import React from "react";

/**
 * Ant Design
 */
import { Layout} from 'antd';

const { Footer } = Layout;

const UserList: React.FC = () => {
    return (
        <React.Fragment>
            <Footer style={{ textAlign: 'center' }}>
                Created by Khang.MNQ ©{new Date().getFullYear()}
            </Footer>
        </React.Fragment>
    )
}
export default UserList