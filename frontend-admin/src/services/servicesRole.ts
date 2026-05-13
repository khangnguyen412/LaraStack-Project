/* eslint-disable */
import { getRequest, postRequest, putRequest, deleteRequest } from '@/api/axios';

/**
 * Type
 */
import type { Role, RoleListRequest } from '@/types/admin/roles.type';

export const GetRoleList = async (params?: RoleListRequest): Promise<any> => {
    try {
        return await getRequest('/admin/roles', { withCredentials: true, params });
    } catch (error) {
        throw error
    }
}

export const GetRoleByID = async (id?: number): Promise<any> => {
    try {
        return await getRequest(`/admin/roles/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}

export const CreateRole = async (data: Role): Promise<any> => {
    try {
        return await postRequest('/admin/roles', { withCredentials: true, data });
    } catch (error) {
        throw error
    }
}

export const UpdateRole = async (data: Role): Promise<any> => {
    try {
        return await putRequest(`/admin/roles/${data.id}`, { withCredentials: true, data });
    } catch (error) {
        throw error
    }
}

export const DeleteRole = async (id?: number): Promise<any> => {
    try {
        return await deleteRequest(`/admin/roles/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}