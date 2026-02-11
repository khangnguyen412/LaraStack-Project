/* eslint-disable */
import { postRequest } from '@/api/axios.ts';

export const Payment = async () => {
    try {
        return await postRequest('/stripe-checkout', {});
    } catch (error) {
        throw error
    }
}
