<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerAdminUsers;


Route::post('/login', [ControllerAuth::class, 'login']);
Route::post('/logout', [ControllerAuth::class, 'logout']);

Route::middleware(["auth:api"])->group(function () {
    Route::get('/admin/profile', [ControllerAuth::class, 'profile']);
});

