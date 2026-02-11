<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerAdminUsers;
use App\Http\Controllers\ControllerPayment;
use App\Http\Controllers\ControllerRoles;

Route::prefix('/admin')->middleware(["auth:api"])->group(function () {
    /** Role */
    Route::apiResource('/roles', ControllerRoles::class);
});