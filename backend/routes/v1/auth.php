<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;

Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware('jwt.cookie')->post('/logout', [ControllerAuth::class, 'logout']);
Route::post('/password/forgot', [ControllerAuth::class, 'forgotPassword']);

Route::prefix('/admin')->middleware(["jwt.cookie", "auth:api"])->group(function () {
    Route::middleware(['auth.permission:UPDATE_USER'])->apiResource('/profile', ControllerAuth::class)->only(['update']);
    Route::get('/me', [ControllerAuth::class, 'currentUser']);
});