/* eslint-disable */
import { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./ProtectedRoute/protectedRoute";


const Template = lazy(() => import('@/pages/Pages'))
const Component = lazy(() => import('@/pages/Component'))
const AdminDashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const UsersList = lazy(() => import('@/pages/dashboard/Users/UsersList'))
const RolesList = lazy(() => import('@/pages/dashboard/Roles/RolesList'))
const PermissionsList = lazy(() => import('@/pages/dashboard/Permissions/PermissionsList'))
const PermissionsCreate = lazy(() => import('@/pages/dashboard/Permissions/PermissionsCreate'))

export const AdminRoute = [
    {
        path: '/template',
        element: (
            <Template />
        )
    },
    {
        path: '/component',
        element: (
            <Component />
        )
    },
    {
        path: '/admin',
        element: (
            <ProtectedAdmin>
                <AdminDashboard />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/users',
        element: (
            <ProtectedAdmin>
                <UsersList />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/roles',
        element: (
            <ProtectedAdmin>
                <RolesList />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/permissions',
        element: (
            <ProtectedAdmin>
                <PermissionsList />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/permissions-create',
        element: (
            <ProtectedAdmin>
                <PermissionsCreate />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/user/:id/edit',
        element: (
            <Suspense></Suspense>
        )
    },
    {
        path: '',
        element: (
            <Suspense></Suspense>
        )
    },
]