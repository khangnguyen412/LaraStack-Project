/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../config/config.ts';

axios.defaults.withCredentials = true;

// Tạo instance riêng
const API = axios.create({
    baseURL: API_URL,
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
        if (error.response?.status === 401 && !error.config.url.includes('/login')) {
            window.location.href = '/login';
            localStorage.removeItem('profile');
        }
        return Promise.reject(error.response?.data || { errorMessage: "Error" });
    }
);

export const postRequest = (endpoint: string, payload: object = {}, config: object = {}) => {
    return API.post(`${API_URL}${endpoint}`, payload, config);
};

export const getRequest = (endpoint: string, config: object = {}) => {
    return API.get(`${API_URL}${endpoint}`, config);
};

export const putRequest = (endpoint: string, payload: object = {}, config: object = {}) => {
    return API.put(`${API_URL}${endpoint}`, payload, config);
};

export const deleteRequest = (endpoint: string, config: object = {}) => {
    return API.delete(`${API_URL}${endpoint}`, config);
};

