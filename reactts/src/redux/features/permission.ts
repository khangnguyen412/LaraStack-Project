/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetRoleList, GetRoleByID } from "@/services/servicesRole.ts";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";

export type RoleState = {
    data: any;
    loading: boolean;
    error?: string | null;
}

export const GetRolesListThunk = createAsyncThunk<{ data: any }, void, { rejectValue: ErrorType }>(
    'roles/getRolesList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetRoleList();
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Get Role List Failed" };
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

const RolesSlice = createSlice({
    name: 'roles',
    initialState: {
        data: null,
        loading: false,
        error: null,
    } as RoleState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRolesListThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetRolesListThunk.fulfilled, (state, action) => {
            state.data = action.payload.data;
        })
        builder.addCase(GetRolesListThunk.rejected, (state, action) => {
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
export default RolesSlice.reducer;
