/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetPermissionList } from "@/services/servicesPermission.ts";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";
import type { PermissionListRequest } from "@/types/admin/permissions.type";

export type PermissionState = {
    data: any;
    total: number;
    loading: boolean;
    error?: any;
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

// export const GetUserIDAdminThunk = createAsyncThunk(
//     'user/getUserIDAdmin',
//     async (id, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await GetUserIDAdmin(token, id);
//             return { data: response.data };
//         } catch (err) {
//             return rejectWithValue(err?.errorMessage || "Get User ID Failed")
//         }
//     }
// )

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
        // .addCase(GetUserIDAdminThunk.pending, (state) => {
        //     state.loading = true;
        // })
        // .addCase(GetUserIDAdminThunk.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.userAdminList = action.payload.data;
        // })
        // .addCase(GetUserIDAdminThunk.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })
    }
})
export default PermissionsSlice.reducer;
