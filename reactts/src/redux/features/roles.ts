/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetRoleList, GetRoleID } from "@/services/servicesRole.ts";

export const GetRolesListThunk = createAsyncThunk(
    'roles/getRolesList',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await GetRoleList(token || "");
            // console.log(response);
            return { data: response };
        } catch (error) {
            return rejectWithValue(error || "Get Role List Failed")
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
        rolesList: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetRolesListThunk.pending, (state) => {
                // state.loading = true;
                // state.error = null;
            })
            .addCase(GetRolesListThunk.fulfilled, (state, action) => {
                // state.loading = false;
                // state.userAdminList = action.payload.data;
            })
            .addCase(GetRolesListThunk.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.payload;
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
