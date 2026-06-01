<?php

/**
 * Illuminate Package
 */
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Controller
 */
use App\Http\Controllers\Payments\PaymentStripe;
use App\Http\Controllers\Payments\PaymentVnPay;

Route::post('/stripe-checkout', [PaymentStripe::class, 'StripePaymentAPI']);

Route::post('/payment/vnpay/create', [PaymentVnPay::class, 'VNPayCreateUrl']);
Route::get('/payment/vnpay/verify', [PaymentVnPay::class, 'VNPayVerify']);
Route::get('/payment/vnpay/ipn', [PaymentVnPay::class, 'VNPayProcessIpn']);
Route::get('/payment/vnpay/generate-hash', [PaymentVnPay::class, 'VNPayGenerateHash']);