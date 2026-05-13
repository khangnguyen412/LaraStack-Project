<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * Contract Payment
 */
use App\Contracts\PaymentGateway;


/**
 * Stripe Payment
 */
use Stripe\Stripe;
use Stripe\Checkout\Session;

class ControllerPayment extends Controller {
    protected PaymentGateway $gateway;

    public function __construct(PaymentGateway $gateway) {
        $this->gateway = $gateway;
    }

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

            return response()->json([
                'status'       => 'success',
                'clientSecret' => $paymentIntent->client_secret,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $th) {
            throw new ValidationException($th->getMessage());
        }
    }

    public function VNPayCreatePayment(Request $request) {
        $orderId = $request->input('order_id');
        $amount = $request->input('amount');

        $orderData = [
            'order_id'    => $orderId,
            'amount'      => $amount,
            'description' => "Checkout order # {$orderId}",
            'locale'      => 'vn',
        ];

        $url = $this->gateway->createPaymentUrl($orderData);
        return redirect()->away($url);
    }

    public function VNPayReturnUrlPayment(Request $request) {
        $data = $request->all();
        $verify = $this->gateway->verifyPayment($data);
        if ($verify) {
            $orderId = $data['vnp_TxnRef'] ?? $data['orderId'];
            return response()->json(['status' => 'success', 'order_id' => $orderId]);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Chữ ký không hợp lệ!']);
        }
    }

    public function VNPayIpnPayment(Request $request) {
        $data = $request->all();
        $result = $this->gateway->processIPN($data);
        if ($result) {
            return response()->json(['code' => '00', 'message' => 'Confirm success']);
        } else {
            return response()->json(['code' => '99', 'message' => 'Confirm failed']);
        }
    }

}
