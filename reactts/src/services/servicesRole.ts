/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

export const GetRoleList = async () => {
    try {
        return await getRequest('/admin/roles', { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const GetRoleByID = async (id?: number) => {
    try {
        return await getRequest(`/admin/roles/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
