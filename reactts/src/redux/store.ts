/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '@/redux/features/auth';
import UserSlice from '@/redux/features/user';
import PaymentSlice from '@/redux/features/payment';
import RolesSlice from '@/redux/features/roles';

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        payment: PaymentSlice,
        roles: RolesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;