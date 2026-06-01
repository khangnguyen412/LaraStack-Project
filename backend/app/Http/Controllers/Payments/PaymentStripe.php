<?php

namespace App\Http\Controllers\Payments;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Controller
 */
use App\Http\Controllers\Controller;


/**
 * Stripe Payment
 */
use Stripe\Stripe;
use Stripe\Checkout\Session;

use App\Http\Resources\Payments\Stripe as StripeResource;

class PaymentStripe extends Controller {
    public function StripePayment() {
        Stripe::setApiKey(config('services.stripe_payment.secret_key'));
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items'           => [
                [
                    'price_data' => [
                        'currency'     => 'usd',
                        'product_data' => ['name' => 'Áo thun demo'],
                        'unit_amount'  => 1000, // $10 USD (1$ = 100 cent)
                    ],
                    'quantity'   => 1,
                ]
            ],
            'mode'                 => 'payment',
            'success_url'          => route('payment.success'),
            'cancel_url'           => route('payment.cancel'),
        ]);
        return view('payment', ['session_id' => $session->id, 'publishable_key' => config('services.stripe_payment.public_key')]);
    }

    /**
     *  - Check payment status has success
     */
    public function StripePaymentSuccess() {
        return "Thanh toán thành công";
    }

    /**
     *  - Check payment status has failed
     */
    public function StripePaymentCancel() {
        return "Bạn đã hủy thanh toán.";
    }

    public function StripePaymentAPI() {
        try {
            $stripe = new \Stripe\StripeClient(config('services.stripe_payment.secret_key'));

            $paymentIntent = $stripe->paymentIntents->create([
                'amount'               => 1000,
                'currency'             => 'usd',
                'payment_method_types' => ['card'],
            ]);
            return StripeResource::make(['status' => 'success', 'clientSecret' => $paymentIntent->client_secret]);
        } catch (\Throwable $th) {
            throw new BadRequestHttpException($th->getMessage());
        }
    }

}
