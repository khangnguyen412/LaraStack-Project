/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout, UserProfile, CheckAuth, ForgotPassword, ResetPassword } from "@/services/servicesAuth";

/**
 * Type
 */
import type { LoginType } from "@/types/login.type";
import type { ErrorType } from "@/types/error.type";

/**
 * Model
 */

type AuthState = {
    data?: LoginType;
    message?: string;
    loading: boolean;
    error?: ErrorType['errors'];
    authenticated: boolean | undefined;
    checked: boolean;
}

const IsEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const LoginThunk = createAsyncThunk<{ data: LoginType }, LoginType, { rejectValue: ErrorType }>(
    'auth/login',
    async ({ username, password }: LoginType, { rejectWithValue }) => {
        try {
            let payload = IsEmail(username || "") ? { email: username || "", password: password || "" } : { username: username || "", password: password || "" };
            const response = await Login(payload);
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Login Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const LogoutThunk = createAsyncThunk<void, void, { rejectValue: ErrorType }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Logout();
            localStorage.removeItem("token");
            localStorage.removeItem("profile");
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Logout Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const CheckAuthThunk = createAsyncThunk<{ data: LoginType }, void, { rejectValue: ErrorType }>(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CheckAuth();
            if (!response?.data) {
                await Logout();
                throw { errorMessage: "Token invalid" };
            }
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Check Auth Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const GetProfileThunk = createAsyncThunk<{ data: LoginType }, void, { rejectValue: ErrorType }>(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserProfile();
            if (!response?.data) {
                throw { errorMessage: "Coundn't take userprofile" };
            }
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Get Profile Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const ForgotPasswordThunk = createAsyncThunk<{ data: { message: string } }, { email: string }, { rejectValue: ErrorType }>(
    'auth/forgot',
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await ForgotPassword({ email });
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Forgot Password Failed" };
            return rejectWithValue(errorData);
        }
    }
)

export const ResetPasswordThunk = createAsyncThunk<{ data: { message: string } }, { email: string, token: string, password: string, confirmPassword: string }, { rejectValue: ErrorType }>(
    'auth/reset',
    async ({ email, token, password, confirmPassword }: { email: string, token: string, password: string, confirmPassword: string }, { rejectWithValue }) => {
        try {
            const response = await ResetPassword({ email, token, password, password_confirmation: confirmPassword });
            return response;
        } catch (error: any) {
            const errorData: ErrorType = error?.data || { errors: "Reset Password Failed" };
            return rejectWithValue(errorData);
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        data: undefined,
        loading: false,
        error: undefined,
        authenticated: undefined,
        checked: false,
    } as AuthState,
    reducers: {
        logout: (state) => {
            state.data = undefined;
            state.error = undefined;
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
            state.data = undefined;
        })
        builder.addCase(LogoutThunk.rejected, (state, action) => {
            state.error = action.payload?.errors;
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
            state.error = action.payload?.errors;
        });
        builder.addCase(ForgotPasswordThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.data?.message;
        })
        builder.addCase(ForgotPasswordThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.errors;
        })
        builder.addCase(ResetPasswordThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload?.data?.message;
        })
        builder.addCase(ResetPasswordThunk.rejected, (state, action) => {   
            state.loading = false;
            state.error = action.payload?.errors;
        })
    },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;