/**
 * Redux
 */
import { useSelector } from "react-redux";
import type { RootState } from '@/redux/store';

export const useRoles = () => {
    const roles = useSelector((state: RootState) => state.auth.data?.roles);
    const roleName = roles?.name;


    const hasRole = (allowedRoles: string[]) => {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        return allowedRoles.includes(roleName || '');
    }

    return { roleName, hasRole };
}