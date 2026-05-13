/* eslint-disable */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

/**
 * Redux
 */
import type { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { CheckAuthThunk } from "@/redux/features/auth";

/** 
 * Hook
 */
import { usePermission } from "@/hooks/usePermission";
import { useRoles } from "@/hooks/useRole";

/**
 * Component
 */
import { Loading } from "@/components/Loading";

/**
 * Type
 */
type RequiredPermission = string | string[];
type RequiredRole = string[];


export const ProtectedAdmin = ({ children, requiredPermission, requiredRole }: { children: React.ReactNode, requiredPermission?: RequiredPermission, requiredRole?: RequiredRole }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { checked, authenticated } = useSelector((state: any) => state.auth)
    const { hasPermission } = usePermission()
    const { hasRole } = useRoles();


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
        return <Navigate to="/login" replace />
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/403" replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        return <Navigate to="/403" replace />;
    }

    return children
}