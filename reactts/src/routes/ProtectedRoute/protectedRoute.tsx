/* eslint-disable */
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

/**
 * Redux
 */
import type { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "@/redux/features/auth.ts";

/**
 * Component
 */
import { Loading } from "@/components/Loading";

export const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { checked, authenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        dispatch(CheckAuthThunk())
    }, [dispatch])

    if (!checked) {
        return <Loading IsLoading={true} />;
    }


    if (!authenticated) {
        console.log('not authenticated')
        return <Navigate to="/login" replace />
    }

    return children
}