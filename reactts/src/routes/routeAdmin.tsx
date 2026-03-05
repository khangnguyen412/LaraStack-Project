/* eslint-disable */
import { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./ProtectedRoute/protectedRoute";


const Template = lazy(() => import('@/pages/Pages'))
const Component = lazy(() => import('@/pages/Component'))
const AdminDashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const Users = lazy(() => import('@/pages/dashboard/UsersList'))
const UsersRole = lazy(() => import('@/pages/dashboard/RolesList'))
const UsersCreate = lazy(() => import('@/pages/dashboard/UsersCreate.tsx'))

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
                <Users />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/roles',
        element: (
            <ProtectedAdmin>
                <UsersRole />
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