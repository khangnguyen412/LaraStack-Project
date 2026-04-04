/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 * Ant Design
 */
import { Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';

/**
 * Redux
 */
import type { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserIDAdminThunk } from '@/redux/features/user';

/**
 * Style
 */
import '@/assets/scss/loading.scss';

/**
 * Component
 */
import { Loading } from '@/components/Loading';

/**
 * Hook
 */
import { HandleDateTime } from '@/hooks/dayTime';

const CloseBtn: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    return (
        <Button key="back" onClick={onCancel}>
            <CloseCircleOutlined />
        </Button>
    )
}
const EditBtn: React.FC<{ onOk: () => void, loading?: boolean }> = ({ onOk, loading }) => {
    return (
        <Button key="edit" type="primary" loading={loading} onClick={onOk}>
            <EditOutlined key="edit" />
        </Button>
    )
}
const DeleteBtn: React.FC<{ onOk: () => void, loading?: boolean }> = ({ onOk, loading }) => {
    return (
        <Button key="delete" type="primary" color="danger" loading={loading} onClick={onOk}>
            <DeleteOutlined key="delete" />
        </Button>
    )
}

const UserProfileModal: React.FC<{ isOpen: boolean, onOk: () => void, onCancel: () => void, loading?: boolean, userID?: string }> = ({ isOpen, onOk, onCancel, loading, userID }) => {

    /**
     * Hooks
     */
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: any) => state.user?.userData);

    /**
     * State
     */
    const [IsLoading, SetLoading] = useState<boolean>(false)
    const [CreateAt, SetCreateAt] = useState<any>(null)
    const [UpdateAt, SetUpdateAt] = useState<any>(null)

    /**
     * Footer Config
     */
    const footer = [
        <CloseBtn key="close" onCancel={onCancel} />,
        <EditBtn key="edit" onOk={onOk} loading={loading} />,
        <DeleteBtn key="delete" onOk={onOk} loading={loading} />,
    ]

    /**
     * Get User Data
     */
    const getUserHandle = () => {
        if (!userID) return;
        dispatch(GetUserIDAdminThunk(userID)).unwrap();
    }

    useEffect(() => {
        if (!isOpen || !userID) return;
        try {
            SetLoading(true);
            getUserHandle();
        } catch (error) {
            console.log("Lỗi:", error);
        } finally {
            SetLoading(false)
        }
    }, [isOpen, userID])

    useEffect(() => {
        if (userData) {
            SetCreateAt(HandleDateTime(userData.created_at, 'FullDate'))
            SetUpdateAt(HandleDateTime(userData.updated_at, 'FullDate'))
        }
    }, [userData])

    return (
        <React.Fragment>
            {userData && (
                <React.Fragment>
                    <Loading IsLoading={IsLoading} FlexLoading={true}></Loading>
                    <Modal open={isOpen} title="Infomations" onOk={onOk} onCancel={onCancel} footer={footer} width={1000}>
                        <div>
                            <h1 className="text-2xl font-bold">{userData.display_name}</h1>
                            <p className="text-gray-600">{userData.roles.name} • Register Date: {CreateAt}</p>
                        </div>
                        <ul className="space-y-2 mt-2" key={userData.id}>
                            <li><span className="font-medium">Email:</span> {userData.email}</li>
                            <li><span className="font-medium">Number Phone:</span> {userData.phone}</li>
                            <li><span className="font-medium">Address:</span> {userData.address}</li>
                            <li><span className="font-medium">Role:</span> {userData.roles.name}</li>
                            <li><span className="font-medium">Update At:</span> {UpdateAt}</li>
                        </ul>
                    </Modal>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default UserProfileModal