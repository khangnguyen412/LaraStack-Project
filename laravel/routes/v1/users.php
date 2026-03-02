<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerUsers;

Route::prefix('/admin')->middleware(["auth:api"])->group(function () {
    /** User */
    Route::apiResource('/user', ControllerUsers::class)->middleware(['permission:READ_USER']);
    Route::get('/update/{id}', [ControllerAuth::class, 'profile']);

    /** Auth */
    Route::get('/profile', [ControllerAuth::class, 'profile']);
});

