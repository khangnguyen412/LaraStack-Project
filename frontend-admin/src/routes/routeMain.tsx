/* eslint-disable */
import { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('@/pages/AppDefault'));
const Login = lazy(() => import('@/pages/user/Login'));
const PaymentTest = lazy(() => import('@/pages/user/PaymentTest'));

export const MainRoute = [
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
]