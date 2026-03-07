<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerUsers;

Route::prefix('/admin')->middleware(["jwt.cookie","auth:api"])->group(function () {
    /** User */
    Route::middleware(['auth.permission:READ_USER'])->apiResource('/user', ControllerUsers::class)->only(['index', 'show']);
    Route::middleware(['auth.permission:CREATE_USER'])->apiResource('/user', ControllerUsers::class)->only(['store']);
    Route::middleware(['auth.permission:UPDATE_USER'])->apiResource('/user', ControllerUsers::class)->only(['update']);
    Route::middleware(['auth.permission:DELETE_USER'])->apiResource('/user', ControllerUsers::class)->only(['destroy']);
});

