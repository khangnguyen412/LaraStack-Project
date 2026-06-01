import { useMemo, useCallback } from 'react';


/**
 * Redux
 */
import { useSelector, } from "react-redux";
import type { RootState } from '@/redux/store';


export const usePermission = () => {
    const permissionsData = useSelector((state: RootState) => state.auth.data?.permissions);

    const permissions = useMemo(() => {
        return permissionsData || [];
    }, [permissionsData]);

    const hasPermission = useCallback((required?: string | string[]) => {
        if (!required || required.length === 0) return true;
        const requiredArray = Array.isArray(required) ? required : [required];
        return requiredArray.every((perm) => permissions.includes(perm));
    }, [permissions]);

    const hasAnyPermission = useCallback((required: string[]): boolean => {
        return required.some((perm) => permissions.includes(perm));
    }, [permissions]);

    return { hasPermission, hasAnyPermission };
}