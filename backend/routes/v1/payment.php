<?php

/**
 * Illuminate Package
 */
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Controller
 */
use App\Http\Controllers\ControllerPayment;

Route::post('/stripe-checkout', [ControllerPayment::class, 'StripePaymentAPI']);
Route::post('/payment/create', [ControllerPayment::class, 'VNPayCreatePayment']);
Route::get('/payment/verify-return', [ControllerPayment::class, 'VNPayReturnUrlPayment']);
Route::get('/payment-ipn', [ControllerPayment::class, 'VNPayIpnPayment']);

Route::get('/generate-hash', function () {
    $data = [
        'vnp_Amount' => '1000000',
        'vnp_BankCode' => 'NCB',
        'vnp_BankTranNo' => '20220514123456',
        'vnp_CardType' => 'ATM',
        'vnp_OrderInfo' => 'Checkout order # TEST123',
        'vnp_PayDate' => '20220514123500',
        'vnp_ResponseCode' => '00',
        'vnp_TmnCode' => env('VNP_TMN_CODE'),
        'vnp_TransactionNo' => '14000123',
        'vnp_TransactionStatus' => '00',
        'vnp_TxnRef' => 'TEST123',
    ];
    ksort($data);
    $hashData = '';
    foreach ($data as $key => $value) {
        $hashData .= urlencode($key) . '=' . urlencode($value) . '&';
    }
    $secret = env('VNP_HASH_SECRET');
    $secureHash = hash_hmac('sha512', $hashData, $secret);
    return $secureHash;
});