/* eslint-disable */
import { getRequest } from '../api/axios';

export const GetUserListAdmin = async (token?: string) => {
    try {
        return await getRequest('/admin/user', { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}

export const GetUserIDAdmin = async (token?: string, id?: string): Promise<any> => {
    try {
        return await getRequest(`/admin/user/${id}`, { "Authorization": `Bearer ${token}` });
    } catch (error) {
        throw error
    }
}
