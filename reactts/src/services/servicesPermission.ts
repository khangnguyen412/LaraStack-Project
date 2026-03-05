/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

export const GetPermissionList = async () => {
    try {
        return await getRequest('/admin/permissions', { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const GetPermissionByID = async (id?: number) => {
    try {
        return await getRequest(`/admin/permissions/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
