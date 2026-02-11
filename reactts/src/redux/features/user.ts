/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Services
 */
import { GetUserListAdmin, GetUserIDAdmin } from '@/services/servicesUsers';

/**
 * Type
 */
type UserAdminListState = {
    data: any;
    userData: any;
    loading: boolean;
    error: string | null;
}

export const GetUserListAdminThunk = createAsyncThunk(
    'user/getUserListAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserListAdmin(token || "");
            return {data: response};
        } catch (error) {
            rejectWithValue(error || "Get User List Failed")
        }
    }
)

export const GetUserIDAdminThunk = createAsyncThunk(
    'user/getUserIDAdmin',
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetUserIDAdmin(token || "", id);
            return response;
        } catch (error) {
            rejectWithValue(error || "Get User ID Failed")
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
            state.data = action?.payload?.data || null;
        })
        builder.addCase(GetUserListAdminThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload as string;
        })
        builder.addCase(GetUserIDAdminThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetUserIDAdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action?.payload?.data || null;
        })
        builder.addCase(GetUserIDAdminThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload as string;
        })
    }
})
export default UserSlice.reducer;