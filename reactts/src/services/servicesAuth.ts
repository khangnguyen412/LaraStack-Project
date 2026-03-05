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

export const CheckAuth = async () => {
    try {
        return await getRequest('/admin/profile', { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export const UserProfile = async () => {
    try {
        return await getRequest('/admin/profile', { withCredentials: true });
    } catch (error) {
        throw error;
    }
}