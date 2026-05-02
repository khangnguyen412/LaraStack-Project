/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetPermissionList, GetPermissionByID } from "@/services/servicesPermission.ts";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";
import type { Permission, PermissionListRequest } from "@/types/admin/permissions.type";

export type PermissionState = {
    data: Permission[] | Permission | null;
    total: number;
    loading: boolean;
    error?: ErrorType['errors'] | null;
}

export const GetPermissionsListThunk = createAsyncThunk<{ data: any, meta: any }, PermissionListRequest, { rejectValue: ErrorType }>(
    'permissions/getPermissionsList',
    async (params, { rejectWithValue }) => {
        try {
            const response = await GetPermissionList(params);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get Permission List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetPermissionByIDThunk = createAsyncThunk<{ data: any }, number, { rejectValue: ErrorType }>(
    'permission/getPermissionByID',
    async (id, { rejectWithValue }) => {
        try {
            const response = await GetPermissionByID(id);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get PermissionByID Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const PermissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        data: null,
        total: 0,
        loading: false,
        error: null,
    } as PermissionState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetPermissionsListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetPermissionsListThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload.data;
            state.total = action.payload.meta?.total || 0;
        })
        builder.addCase(GetPermissionsListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
        .addCase(GetPermissionByIDThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetPermissionByIDThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        .addCase(GetPermissionByIDThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })
    }
})
export default PermissionsSlice.reducer;
