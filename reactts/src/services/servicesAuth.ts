/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios.ts';

export const Logout = async () => {
    try {
        return await postRequest('/logout', {}, { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export const Login = async (payload: object) => {
    try {
        return await postRequest('/login', payload, { headers: { "Content-Type": "application/json" } });
    } catch (error) {
        throw error;
    }
}

export const CheckAuth = async (token: string) => {
    try {
        return await getRequest('/admin/profile', { "Authorization": `Bearer ${token}` })
    } catch (error) {
        throw error;
    }
}

export const UserProfile = async (token: string) => {
    try {
        return await getRequest('/admin/profile', { "Authorization": `Bearer ${token}` })
    } catch (error) {
        throw error;
    }
}