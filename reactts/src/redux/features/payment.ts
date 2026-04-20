import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Services
 */
import { Payment } from '@/services/servicesPayment';

/**
 * Type
 */
type PaymentState = {
    clientSecret: string;
}

export const GetClientSecretThunk = createAsyncThunk(
    'payment/getClientSecret',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Payment();
            return response;
        } catch (error) {
            rejectWithValue(error || "Get Client Secret Failed")
        }
    }
)

const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        clientSecret: '',
    } as PaymentState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetClientSecretThunk.fulfilled, (state, action) => {
            state.clientSecret = action.payload?.data?.clientSecret || '';
        })
    }
})
export default PaymentSlice.reducer;