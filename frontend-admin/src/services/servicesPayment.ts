/* eslint-disable */
import { postRequest } from '@/api/axios';

export const Payment = async () => {
    try {
        return await postRequest('/stripe-checkout', {});
    } catch (error) {
        throw error
    }
}
