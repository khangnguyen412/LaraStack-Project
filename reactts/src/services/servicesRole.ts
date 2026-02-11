/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

export const GetRoleList = async (token?: string) => {
    try {
        return await getRequest('/admin/roles', { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}

export const GetRoleID = async (token?: string, id?: number) => {
    try {
        return await getRequest(`/admin/roles/${id}`, { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}
