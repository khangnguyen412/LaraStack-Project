import { Suspense, lazy } from "react";
import { ProtectedAdmin } from "./ProtectedRoute/protectedRoute";

/**
 * Constants
 */
// import { PERMISSIONS } from "@/constants/permissions";


const Template = lazy(() => import('@/pages/Pages'))
const Component = lazy(() => import('@/pages/Component'))
const AppDefault = lazy(() => import('@/pages/AppDefault'));
const Login = lazy(() => import('@/pages/Auths/Login'));
const PaymentTest = lazy(() => import('@/pages/Payments/PaymentTest'));

/**
 * Dashboard
 */
const AdminDashboard = lazy(() => import('@/pages/Dashboard'))

/**
 * Users
 */
const UsersList = lazy(() => import('@/pages/Users/UsersList'))

/**
 * Roles
 */
const RolesSearch = lazy(() => import('@/pages/Roles/RolesSearch'))
const Roles = lazy(() => import('@/pages/Roles/Roles'))

/**
 * Permissions
 */
const PermissionsSearch = lazy(() => import('@/pages/Permissions/PermissionsSearch'))
const Permissions = lazy(() => import('@/pages/Permissions/Permissions'))

export const AdminRoute = [
    {
        path: '/',
        element: (
            <AppDefault />
        )
    },
    {
        path: '/login',
        element: (
            <Login />
        )
    },
    {
        path: '/payment-test',
        element: (
            <PaymentTest />
        )
    },
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
            <ProtectedAdmin >
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
            <ProtectedAdmin requiredRole={['Administrator']}>
                <RolesSearch />
            </ProtectedAdmin>
        ),
    },
    {
        path: '/admin/roles/create',
        element: (
            <ProtectedAdmin>
                <Roles isUpdate={false} />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/roles/update/:id',
        element: (
            <ProtectedAdmin>
                <Roles isUpdate={true} />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/permissions',
        element: (
            <ProtectedAdmin>
                <PermissionsSearch />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/permissions-create',
        element: (
            <ProtectedAdmin>
                <Permissions isUpdate={false} />
            </ProtectedAdmin>
        )
    },
    {
        path: '/admin/permissions-update/:id',
        element: (
            <ProtectedAdmin>
                <Permissions isUpdate={true} />
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