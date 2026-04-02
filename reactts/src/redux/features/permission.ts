/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetPermissionList, GetPermissionByID } from "@/services/servicesPermission.ts";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";
import type { PaginationRequestType } from "@/types/common.type";

export type RoleState = {
    data: any;
    loading: boolean;
    error?: string | null;
}

export const GetPermissionsListThunk = createAsyncThunk<{ data: any }, PaginationRequestType, { rejectValue: ErrorType }>(
    'permissions/getPermissionsList',
    async (params, { rejectWithValue }) => {
        try {
            const response = await GetPermissionList(params);
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Get Permission List Failed" };
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
        loading: false,
        error: null,
    } as RoleState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetPermissionsListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetPermissionsListThunk.fulfilled, (state, action) => {
            state.data = action.payload.data;
        })
        builder.addCase(GetPermissionsListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errorMessage;
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
