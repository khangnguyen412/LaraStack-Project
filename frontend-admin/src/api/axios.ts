import axios from 'axios';
import { Config } from '../config/config.ts';

Config.validateRequired();

axios.defaults.withCredentials = true;

// Tạo instance riêng
export const API = axios.create({
    baseURL: Config.API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Interceptor cho instance riêng
/**
 * Sau hàm này, nếu muốn return về thì dùng
 * return { data: response.data, status: response.status };
 * hoặc 
 * return response.data;
 */
API.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const PUBLIC_ROUTES = ['/password/reset', '/password/forgot', '/register', '/login'];
        const isPublicRoute = PUBLIC_ROUTES.some(route => error.config.url.includes(route));

        if (error.response?.status === 401 && !isPublicRoute) {
            window.location.href = '/login';
            localStorage.removeItem('profile');
        }
        return Promise.reject(error.response?.data || { errorMessage: "Error" });
    }
);

export const postRequest = (endpoint: string, payload: object = {}, config: object = {}) => {
    return API.post(`${Config.API_URL}${endpoint}`, payload, config);
};

export const getRequest = (endpoint: string, config: object = {}) => {
    return API.get(`${Config.API_URL}${endpoint}`, config);
};

export const putRequest = (endpoint: string, payload: object = {}, config: object = {}) => {
    return API.put(`${Config.API_URL}${endpoint}`, payload, config);
};

export const deleteRequest = (endpoint: string, config: object = {}) => {
    return API.delete(`${Config.API_URL}${endpoint}`, config);
};

