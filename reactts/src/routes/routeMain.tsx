/* eslint-disable */
import { Suspense, lazy } from "react";

const AppDefault = lazy(() => import('@/pages/AppDefault.tsx'));
const Login = lazy(() => import('@/pages/user/Login.tsx'));
const PaymentTest = lazy(() => import('@/pages/user/PaymentTest.tsx'));

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