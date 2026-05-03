/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

export const Logout = async (): Promise<any> => {
    try {
        return await postRequest('/logout', {}, { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export const Login = async (payload: object): Promise<any> => {
    try {
        return await postRequest('/login', payload, { headers: { "Content-Type": "application/json" } });
    } catch (error) {
        throw error;
    }
}

export const CheckAuth = async (): Promise<any> => {
    try {
        return await getRequest('/admin/me', { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export const UserProfile = async (): Promise<any> => {
    try {
        return await getRequest('/admin/me', { withCredentials: true });
    } catch (error) {
        throw error;
    }
}