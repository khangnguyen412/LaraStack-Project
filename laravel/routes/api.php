<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

use App\Http\Controllers\ControllerPayment;
Route::post('/stripe-checkout', [ControllerPayment::class, 'StripePaymentAPI']);
Route::get('/test-log', function () {
    \Log::channel('discord')->error('Đây là nội dung lỗi chính!');
    return 'Đã chạy lệnh gửi log!';
});
