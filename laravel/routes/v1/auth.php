<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerAdminUsers;
use Tymon\JWTAuth\Facades\JWTAuth;


Route::post('/login', [ControllerAuth::class, 'login']);
Route::middleware('jwt.cookie')->post('/logout', [ControllerAuth::class, 'logout']);

Route::middleware(["jwt.cookie", "auth:api"])->group(function () {
    Route::get('/admin/profile', [ControllerAuth::class, 'profile']);
});