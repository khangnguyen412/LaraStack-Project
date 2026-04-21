/* eslint-disable no-unused-vars */
import type { PaginationResponseType, PaginationRequestType } from '@/types/common.type';

interface Permission {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export type PermissionListResponse = {
    data: Permission[];
    meta: PaginationResponseType;
}

export type PermissionListRequest = PaginationRequestType & {
    name?: string,
    description?: string
}
