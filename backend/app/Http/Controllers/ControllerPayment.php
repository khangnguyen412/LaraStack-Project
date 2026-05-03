<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use Stripe\Stripe;
use Stripe\Checkout\Session;

class ControllerPayment extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     *  Payment Stripe Method
     *  Test Stripe: https://docs.stripe.com/testing
     *  
     *  Payment Flow:
     *  1. User choose product in cart
     *  2. User click checkout button
     *  3. User choose payment method in checkout
     *  4. Check stock before payment
     *  5. Stripe create PaymentIntent or Checkout Session
     *  6. Frontend receive client_secret and confirm payment
     *  7. Stripe return payment status to frontend
     *  8. Update DB after payment success
     */
    public function StripePayment()
    {
        Stripe::setApiKey(config('services.stripe_payment.secret_key'));
        $session = Session::create([
            'payment_method_types'  => ['card'],
            'line_items' => [[
                'price_data'        => [
                    'currency'      => 'usd',
                    'product_data'  => ['name' => 'Áo thun demo'],
                    'unit_amount'   => 1000, // $10 USD (1$ = 100 cent)
                ],
                'quantity'          => 1,
            ]],
            'mode'                  => 'payment',
            'success_url'           => route('payment.success'),
            'cancel_url'            => route('payment.cancel'),
        ]);
        return view('payment', ['session_id' => $session->id, 'publishable_key' => config('services.stripe_payment.public_key')]);
    }

    /**
     *  - Thanh toán thành công
     */
    public function StripePaymentSuccess()
    {
        return "Thanh toán thành công";
    }

    /**
     *  - Thanh toán bị hủy
     */
    public function StripePaymentCancel()
    {
        return "Bạn đã hủy thanh toán.";
    }

    public function StripePaymentAPI()
    {
        try {
            $stripe = new \Stripe\StripeClient(config('services.stripe_payment.secret_key'));

            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => 1000,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);

            return response()->json([
                'status' => 'success',
                'clientSecret' => $paymentIntent->client_secret,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $th) {
            throw new ValidationException($th->getMessage());
        }
    }

    /**
     *  Tạo PaymentIntent 
     *  - PaymentIntent là một đối tượng được tạo ra để quản lý toàn bộ quá trình thanh toán , từ khi bắt đầu đến khi hoàn tất giao dịch.
     *  Nó chứa:
     *  + Số tiền cần thu 
     *  + Loại tiền tệ
     *  + Trạng thái (pending, succeeded, failed,...)
     *  + Thông tin phương thức thanh toán (nếu đã có)
     *  + Secret key để frontend confirm
     *  Flow cơ bản: 
     *  -> Khởi tạo PaymentIntent 
     *  -> Frontend nhận client_secret 
     *  -> Stripe SDK: gắn thẻ + confirm 
     *  -> Webhook nhận trạng thái thành công/thất bại 
     *  -> Cập nhật đơn hàng trong DB
     */
    public function StripePaymentFLow()
    {
        /**
         *  Smock data
         */
        // $product = OBJECT;
        
        /** 
         *  1. Người dùng chọn sản phẩm
         */
        // session()->push('cart', ['id' => '', 'name' => '', 'price' => '', 'quantity' => 1]);
        
        /**
         *  2. Cho vào giỏ hàng
         */
        // $cart = session()->get('cart', []);
        // $total = array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $cart));
        
        /**
         *  3. Chọn phương thức thanh toán
         *  - Người dùng chọn hình thức thanh toán: thẻ, ví điện tử,...
         *  - Trong trường hợp này: Stripe Checkout hoặc PaymentIntent
         */

        /**
         *  4. Kiểm tra tồn kho trước khi thanh toán
         */
        // foreach ($cart as $item) {
        //     $product = $product::find($item['id']);
        //     if ($product && $product->stock < $item['quantity']) {
        //         return redirect()->back()->with('error', 'Sản phẩm ' . $product->name . ' hết hàng');
        //     }
        // }
        
        /**
         *  5. Gửi Stripe tạo PaymentIntent hoặc Checkout Session
         */
        // Stripe::setApiKey(config('services.stripe_payment.secret_key'));
        // $lineItems = collect($cart)->map(function ($item) {
        //     return [
        //         'price_data' => [
        //             'currency' => 'usd',
        //             'product_data' => ['name' => $item['name']],
        //             'unit_amount' => $item['price'] * 100, // từ $10 → 1000 cents
        //         ],
        //         'quantity' => $item['quantity'],
        //     ];
        // })->toArray();
        // $session = Session::create([
        //     'payment_method_types' => ['card'],
        //     'line_items' => $lineItems,
        //     'mode' => 'payment',
        //     'success_url' => route('checkout.success'),
        //     'cancel_url' => route('checkout.cancel'),
        // ]);
        // return view('payment.checkout', [
        //     'session_id' => $session->id,
        //     'publishable_key' => config('services.stripe.key')
        // ]);
        
        /**
         *  6. Frontend nhận client_secret và confirm thanh toán (laravel/resources/views/payment.blade.php)
         *  7. Stripe trả về trạng thái thanh toán
         *  8. Cập nhật DB sau khi thanh toán thành công
         */
        // function ($request) {
        //     $order = OBJECT;
        //     $product = OBJECT;
        //     $payload = json_decode($request->getContent(), true);
        //     if ($payload['type'] === 'checkout.session.completed') {
        //         $session = $payload['data']['object'];
        //         $paymentIntentId = $session['payment_intent'];
        //         // Lấy thông tin payment intent
        //         $paymentIntent = \Stripe\PaymentIntent::retrieve($paymentIntentId);
        //         if ($paymentIntent->status === 'succeeded') {
        //             // Lưu order vào database
        //             $order::create([
        //                 'user_id' => auth()->id(),
        //                 'total' => $session['amount_total'] / 100,
        //                 'status' => 'paid'
        //             ]);
        //             // Giảm tồn kho
        //             foreach (session('cart') as $item) {
        //                 $product::find($item['id'])->decrement('stock', $item['quantity']);
        //             }
        //             session()->forget('cart');
        //         }
        //     }
        //     return response()->json(['status' => 'ok']);
        // };
    }
}
