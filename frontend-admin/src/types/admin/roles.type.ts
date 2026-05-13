import type { PaginationAntType, PaginationRequestType, PaginationResponseType } from '@/types/common.type';
import type { Permission } from '@/types/admin/permissions.type';

export interface Role {
    id?: number;
    name: string;
    description?: string;
    permissions?: Permission[] | number[];
    createdAt?: string;
    updatedAt?: string;
}

export type RoleDataDomType = PaginationAntType & {
    name: string,
    description?: string
}

export type RoleListResponse = {
    data: Role[];
    meta: PaginationResponseType;
}

export type RoleListRequest = PaginationRequestType & Role