/* eslint-disable */
import { getRequest } from '../api/axios';

export const GetUserListAdmin = async (): Promise<any> => {
    try {
        return await getRequest('/admin/users', { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const GetUserIDAdmin = async (id?: string): Promise<any> => {
    try {
        return await getRequest(`/admin/users/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
