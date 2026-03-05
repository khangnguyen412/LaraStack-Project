/* eslint-disable */
import { getRequest } from '../api/axios';

export const GetUserListAdmin = async (): Promise<any> => {
    try {
        return await getRequest('/admin/user', { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const GetUserIDAdmin = async (id?: string): Promise<any> => {
    try {
        return await getRequest(`/admin/user/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
