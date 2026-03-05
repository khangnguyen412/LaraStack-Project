/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout, UserProfile, CheckAuth } from "@/services/servicesAuth";

/**
 * Type
 */
import type { LoginType } from "@/types/login.type";
import type { ErrorType } from "@/types/error.type";

/**
 * Model
 */

type AuthState = {
    data: any;
    loading: boolean;
    error: any;
    authenticated: boolean | undefined;
    checked: boolean;
}

const IsEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const LoginThunk = createAsyncThunk<{ data: any }, LoginType, { rejectValue: ErrorType }>(
    'auth/login',
    async ({ username, password }: LoginType, { rejectWithValue }) => {
        try {
            let payload = IsEmail(username || "") ? { email: username || "", password: password || "" } : { username: username || "", password: password || "" };
            const response = await Login(payload);
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Login Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const LogoutThunk = createAsyncThunk<{ data: any }, void, { rejectValue: ErrorType }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Logout();
            if (response?.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
            } else {
                throw { errorMessage: "Logout Failed" };
            }
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Logout Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const CheckAuthThunk = createAsyncThunk<{ data: any }, void, { rejectValue: ErrorType }>(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CheckAuth();
            if (response?.status !== 200) {
                await Logout();
                throw { errorMessage: "Token invalid" };
            }
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Check Auth Failed" };
            return rejectWithValue(errorData);
        }
    }
)


export const GetProfileThunk = createAsyncThunk<{ data: any }, void, { rejectValue: ErrorType }>(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserProfile();
            if (response?.status !== 200) {
                throw { errorMessage: "Coundn't take userprofile" };
            }
            return { data: response };
        } catch (error: any) {
            const errorData: ErrorType = error || { errorMessage: error.message || "Get Profile Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        loading: false,
        error: null,
        authenticated: undefined,
        checked: false,
    } as AuthState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CheckAuthThunk.fulfilled, (state) => {
            state.checked = true;
            state.authenticated = true;
        })
        builder.addCase(CheckAuthThunk.rejected, (state) => {
            state.checked = true;
            state.authenticated = false;
        })
        builder.addCase(GetProfileThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GetProfileThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
        })
        builder.addCase(LogoutThunk.fulfilled, (state) => {
            state.data = null;
        })
        builder.addCase(LogoutThunk.rejected, (state, action) => {
            state.error = action.payload?.errorMessage || "Logout Failed";
        })
        builder.addCase(LoginThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errorMessage || "Login Failed";
        });
    },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;