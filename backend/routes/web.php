<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerPayment;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/stripe-checkout', [ControllerPayment::class, 'StripePayment'])->name('payment');
Route::get('/payment-success', [ControllerPayment::class, 'StripePaymentSuccess'])->name('payment.success');
Route::get('/payment-cancel', [ControllerPayment::class, 'StripePaymentCancel'])->name('payment.cancel');
