import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/protectedRoute";

/**
 * Constants
 */
// import { PERMISSIONS } from "@/constants/permissions";

const Template = lazy(() => import('@/pages/Pages'))
const Component = lazy(() => import('@/pages/Component'))
const AppDefault = lazy(() => import('@/pages/AppDefault'));
const PaymentTest = lazy(() => import('@/pages/Payments/PaymentTest'));

/**
 * Auths
 */
const Login = lazy(() => import('@/pages/Auths/Login'));
const ForgotPassword = lazy(() => import('@/pages/Auths/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/Auths/ResetPassword'));

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

    /**
     * Auths
     */
    {
        path: '/login',
        element: (
            <Login />
        )
    },
    {
        path: '/password/forgot',
        element: (
            <ForgotPassword />
        )
    },
    {   
        path: '/password/reset',
        element: (
            <ResetPassword />
        )
    },

    /**
     * Common
     */
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

    /**
     * Dashboard
     */
    {
        path: '/admin',
        element: (
            <ProtectedRoute >
                <AdminDashboard />
            </ProtectedRoute>
        )
    },

    /**
     * Users
     */
    {
        path: '/admin/users',
        element: (
            <ProtectedRoute>
                <UsersList />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/user/:id/edit',
        element: (
            <Suspense></Suspense>
        )
    },

    /**
     * Roles
     */
    {
        path: '/admin/roles',
        element: (
            <ProtectedRoute requiredRole={['Administrator']}>
                <RolesSearch />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/roles/create',
        element: (
            <ProtectedRoute>
                <Roles isUpdate={false} />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/roles/update/:id',
        element: (
            <ProtectedRoute>
                <Roles isUpdate={true} />
            </ProtectedRoute>
        )
    },

    /**
     * Permissions
     */
    {
        path: '/admin/permissions',
        element: (
            <ProtectedRoute>
                <PermissionsSearch />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/permissions-create',
        element: (
            <ProtectedRoute>
                <Permissions isUpdate={false} />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/permissions-update/:id',
        element: (
            <ProtectedRoute>
                <Permissions isUpdate={true} />
            </ProtectedRoute>
        )
    },

    {
        path: '',
        element: (
            <Suspense></Suspense>
        )
    },
]