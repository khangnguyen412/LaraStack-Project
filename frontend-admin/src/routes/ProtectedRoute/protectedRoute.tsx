/* eslint-disable */
import { useEffect } from "react";

/**
 * Redux
 */
import type { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "@/redux/features/auth";

/**
 * Component
 */
import { Loading } from "@/components/Loading";

export const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { checked, authenticated } = useSelector((state: any) => state.auth)

    const checkAuthHandle = async () => {
        try {
            await dispatch(CheckAuthThunk())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkAuthHandle()
    }, [dispatch])

    if (!checked) {
        return <Loading IsLoading={true} />;
    }

    if (!authenticated) {
        // return <Navigate to="/login" replace />
    }

    return children
}