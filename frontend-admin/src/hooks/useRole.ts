import { useMemo, useCallback } from 'react';

/**
 * Redux
 */
import { useSelector } from "react-redux";
import type { RootState } from '@/redux/store';



export const useRoles = () => {
    const roles = useSelector((state: RootState) => state.auth.data?.roles);
    const roleName = useMemo(() => {
        return roles?.name || '';
    }, [roles]);


    const hasRole = useCallback((allowedRoles: string[]) => {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        return allowedRoles.includes(roleName);
    }, [roleName]);

    return { roleName, hasRole };
}