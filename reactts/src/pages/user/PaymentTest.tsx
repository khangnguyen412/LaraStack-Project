/* eslint-disable */
import React, { useEffect, useState } from "react";

/**
 *  Stripe
 */
import { loadStripe } from '@stripe/stripe-js';
import type { StripeCardElement } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

/**
 *  Services
 */
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "@/redux/store";
import { GetClientSecretThunk } from '@/redux/features/payment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    const stripe = useStripe();
    const element = useElements();
    const HandleSumbit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !element) return;

        const response = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement) as StripeCardElement,
                billing_details: {
                    name: 'John Doe',
                },
            }
        });

        if (response.error) {
            console.count(response.error.message)
        } else {
            if (response.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
            }
        }
    }
    return (
        <form onSubmit={HandleSumbit}>
            <CardElement />
            <button type="submit">Thanh toán</button>
        </form>
    );
}

const PaymentForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [clientSecret, setClientSecret] = useState<any>(null);

    useEffect(() => {
        (async () => {
            dispatch(GetClientSecretThunk());
            const response = await dispatch(GetClientSecretThunk()).unwrap();
            setClientSecret(response)
        })();
    }, []);

    return (
        <div>
            {/* Display Stripe Elements */}
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} />
                </Elements>
            )}
        </div>
    );
};

const PaymentPage = () => {
    return (
        <React.Fragment>
            <main>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </main>
        </React.Fragment>
    )
}

export default PaymentPage;