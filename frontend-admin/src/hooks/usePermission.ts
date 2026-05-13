/**
 * Redux
 */
import { useSelector } from "react-redux";
import type { RootState } from '@/redux/store';


export const usePermission = () => {
    const permissions = useSelector((state: RootState) => state.auth.data?.permissions || []);

    const hasPermission = (required?: string | string[]) => {
        if (!required || required.length === 0) return true;
        const requiredArray = Array.isArray(required) ? required : [required];
        return requiredArray.every((perm) => permissions.includes(perm));
    }

    const hasAnyPermission = (required: string[]): boolean => {
        return required.some((perm) => permissions.includes(perm));
    };
    return { hasPermission, hasAnyPermission };
}