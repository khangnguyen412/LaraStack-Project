/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Service
 */
import { GetRoleList, GetRoleByID, CreateRole, UpdateRole, DeleteRole } from "@/services/servicesRole";

/**
 * Type
 */
import type { ErrorType } from "@/types/error.type";
import type { Role, RoleListRequest } from "@/types/admin/roles.type";

export type RoleState = {
    data?: Role[] | Role | null;
    loading: boolean;
    error?: ErrorType['errors'] | null;
}

export const GetRolesListThunk = createAsyncThunk<{ data: Role[], meta: any }, RoleListRequest, { rejectValue: ErrorType }>(
    'roles/getRolesList',
    async (params, { rejectWithValue }) => {
        try {
            const response = await GetRoleList(params);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get Role List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetRoleByIDThunk = createAsyncThunk<{ data: Role }, number, { rejectValue: ErrorType }>(
    'role/getRoleByID',
    async (id, { rejectWithValue }) => {
        try {
            const response = await GetRoleByID(id);
            return { data: response.data };
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get Role List Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const CreateRoleThunk = createAsyncThunk<{ data: Role }, Role, { rejectValue: ErrorType }>(
    'role/createRole',
    async (data, { rejectWithValue }) => {
        try {
            const response = await CreateRole(data);
            return { data: response.data };
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Add Role Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const UpdateRoleThunk = createAsyncThunk<{ data: Role & { id: number } }, Role, { rejectValue: ErrorType }>(
    'role/updateRole',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await UpdateRole({ ...data, id: data.id });
            return { data: response.data };
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Update Role Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const DeleteRoleThunk = createAsyncThunk<{ data: Role }, number, { rejectValue: ErrorType }>(
    'role/deleteRole',
    async (id, { rejectWithValue }) => {
        try {
            const response = await DeleteRole(id);
            return { data: response.data };
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Delete Role Failed" };
            return rejectWithValue(errorData);
        }
    }
)



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
            state.data = action?.payload?.data;
        })
        builder.addCase(GetRolesListThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
        builder.addCase(GetRoleByIDThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetRoleByIDThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(GetRoleByIDThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
        builder.addCase(CreateRoleThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(CreateRoleThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(CreateRoleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
        builder.addCase(UpdateRoleThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(UpdateRoleThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(UpdateRoleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
        builder.addCase(DeleteRoleThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(DeleteRoleThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        builder.addCase(DeleteRoleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.errors;
        })
    }
})
export default RolesSlice.reducer;
