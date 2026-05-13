# Payment integration

## Payment Stripe Method
- Document: https://docs.stripe.com/testing
### Payment Flow:
1. User choose product in cart
2. User click checkout button
3. User choose payment method in checkout
4. Check stock before payment
5. Stripe create PaymentIntent or Checkout Session
6. Frontend receive client_secret and confirm payment
7. Stripe return payment status to frontend
8. Update DB after payment success
### What is PaymentIntent?
- PaymentIntent is a Stripe object that represents a payment intent. when a user click "checkout button", to create a PaymentIntent object.
- PaymentIntent object contains: 
    - Cost must be in cents
    - Currency
    - Status (pending, succeeded, failed,...)
    - Payment method used (if available)
    - Secret key to confirm payment in frontend
- Basic Flow: 
    - Stripe create PaymentIntent 
    - Frontend receive client_secret 
    - Stripe SDK: attach payment method + confirm payment intent 
    - Webhook receive payment status 
    - Update DB after payment success
### Integration example step by step
1. In StripePaymentFLow method:
- Mock data
```php
$product = OBJECT;
```
- User choose product in cart
```php
session()->push('cart', ['id' => $product->id, 'name' => $product->name, 'price' => $product->price, 'quantity' => 1]);
```
- User click checkout button
```php
$cart = session()->get('cart', []);
$total = array_sum(array_map(fn($item) => $item['price'] * $item['quantity'], $cart));
```
- User choose payment method in checkout
    - Người dùng chọn hình thức thanh toán: thẻ, ví điện tử,...
    - Trong trường hợp này: Stripe Checkout hoặc PaymentIntent
- Check stock before payment
```php
foreach ($cart as $item) {
    $product = $product::find($item['id']);
    if ($product && $product->stock < $item['quantity']) {
        return redirect()->back()->with('error', 'Sản phẩm ' . $product->name . ' hết hàng');
    }
}
```
- send request to Stripe create PaymentIntent or Checkout Session
```php
Stripe::setApiKey(config('services.stripe_payment.secret_key'));
$lineItems = collect($cart)->map(function ($item) {
    return [
        'price_data' => [
            'currency' => 'usd',
            'product_data' => ['name' => $item['name']],
            'unit_amount' => $item['price'] * 100, // từ $10 → 1000 cents
        ],
        'quantity' => $item['quantity'],
    ];
})->toArray();
$session = Session::create([
    'payment_method_types' => ['card'],
    'line_items' => $lineItems,
    'mode' => 'payment',
    'success_url' => route('checkout.success'),
    'cancel_url' => route('checkout.cancel'),
]);
return view('payment.checkout', [
    'session_id' => $session->id,
    'publishable_key' => config('services.stripe.key')
]);
```
- Frontend receive client_secret and confirm payment (laravel/resources/views/payment.blade.php)
- Stripe return payment status to frontend
- Update DB after payment success
```php
function StripePaymentSuccess ($request) {
    $order = OBJECT;
    $product = OBJECT;
    $payload = json_decode($request->getContent(), true);
    if ($payload['type'] === 'checkout.session.completed') {
        $session = $payload['data']['object'];
        $paymentIntentId = $session['payment_intent'];
        // Lấy thông tin payment intent
        $paymentIntent = \Stripe\PaymentIntent::retrieve($paymentIntentId);
        if ($paymentIntent->status === 'succeeded') {
            // Lưu order vào database
            $order::create([
                'user_id' => auth()->id(),
                'total' => $session['amount_total'] / 100,
                'status' => 'paid'
            ]);
            // Giảm tồn kho
            foreach (session('cart') as $item) {
                $product::find($item['id'])->decrement('stock', $item['quantity']);
            }
            session()->forget('cart');
        }
    }
    return response()->json(['status' => 'ok']);
};
```