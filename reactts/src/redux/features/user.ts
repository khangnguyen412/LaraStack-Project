/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Services
 */
import { GetUserListAdmin, GetUserIDAdmin } from '@/services/servicesUsers';

/**
 * Type
 */
import type { ErrorType } from '@/types/error.type';
type UserAdminListState = {
    data?: any;
    userData: any;
    loading: boolean;
    error?: string | null;
}

export const GetUserListAdminThunk = createAsyncThunk<{ data: any }, any, { rejectValue: ErrorType }>(
    'user/getUserListAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserListAdmin(token || "");
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Get User List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetUserIDAdminThunk = createAsyncThunk<{ data: any }, any, { rejectValue: ErrorType }>(
    'user/getUserIDAdmin',
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserIDAdmin(token || "", id);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Get User ID Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        userData: null,
        loading: false,
        error: null,
    } as UserAdminListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetUserListAdminThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(GetUserListAdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action?.payload?.data;
        })
        builder.addCase(GetUserListAdminThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errorMessage;
        })
        builder.addCase(GetUserIDAdminThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetUserIDAdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action?.payload?.data;
        })
        builder.addCase(GetUserIDAdminThunk.rejected, (state, action) => {
            console.log(action?.payload);
            state.loading = false;
            state.error = action?.payload?.errorMessage;
        })
    }
})
export default UserSlice.reducer;