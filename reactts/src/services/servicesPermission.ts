/* eslint-disable */
import { postRequest, getRequest } from '@/api/axios';

/**
 * Type
 */
import type { PaginationRequestType } from '@/types/common.type';

export const GetPermissionList = async (params: PaginationRequestType = {}) => {
    try {
        return await getRequest('/admin/permissions', {
            withCredentials: true,
            params: {
                ...params,
            }
        });
    } catch (error) {
        throw error
    }
}

export const GetPermissionByID = async (id?: number) => {
    try {
        return await getRequest(`/admin/permissions/${id}`, { withCredentials: true });
    } catch (error) {
        throw error
    }
}
