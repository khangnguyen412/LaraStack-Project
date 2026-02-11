/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Services
*/
import { Login, Logout, UserProfile, CheckAuth } from "@/services/servicesAuth";

/**
 * Type
 */
type AuthState = {
    data: any;
    loading: boolean;
    error: string | null;
    authenticated: boolean;
    checked: boolean;
}

const IsEmail = (input: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

export const LoginThunk = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
        try {
            let payload = IsEmail(username) ? { email: username, password } : { username, password };
            const response = await Login(payload);
            if (response?.status === 200) {
                return {data: response};
            } else {
                return rejectWithValue(response || "Login Failed");
            }
        } catch (error) {
            return rejectWithValue(error || "Login Failed");
        }
    }
)

export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Logout();
            if (response?.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("profile");
            } else {
                return rejectWithValue(response || "Logout Failed");
            }
            return {data: response};
        } catch (err) {
            return rejectWithValue(err || "Logout Failed");
        }
    }
)

export const CheckAuthThunk = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token not found")
                return;
            }
            const response = await CheckAuth(token);
            if (response?.status !== 200) {
                await Logout();
                return rejectWithValue("Token invalid");
            }
            return {data: response};
        } catch (error) {
            rejectWithValue(error || "Check Auth Failed")
        }
    }
)


export const GetProfileThunk = createAsyncThunk(
    'auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Coundn't take userprofile");
            }
            const response = await UserProfile(token);
            if (response?.status !== 200) {
                return rejectWithValue("Coundn't take userprofile");
            }
            return {data: response};
        } catch (error) {
            rejectWithValue(error || "Get Profile Failed")
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        loading: false,
        error: null,
        authenticated: false,
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
        builder.addCase(CheckAuthThunk.fulfilled, (state, action) => {
            state.checked = true;
            state.authenticated = action.payload?.data?.status === 200 ? true : false;
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
            state.error = null;
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
            state.error = action.payload as string;
        });
    },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;