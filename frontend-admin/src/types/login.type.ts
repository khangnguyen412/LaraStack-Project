import type { Role } from './admin/roles.type';

export type LoginType = {
    email?: string;
    username?: string;
    password?: string;
    permissions?: string[];
    roles?: Role;
}