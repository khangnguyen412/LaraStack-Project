<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerRoles;

Route::prefix('/admin')->middleware(["jwt.cookie","auth:api"])->group(function () {
    /** Role */
    Route::middleware(['auth.permission:READ_ROLE'])->apiResource('/roles', ControllerRoles::class)->only(['index']);
    Route::middleware(['auth.permission:READ_ROLE'])->get('/roles/{id}', [ControllerRoles::class, 'show']);
    Route::middleware(['auth.permission:CREATE_ROLE'])->post('/roles', [ControllerRoles::class, 'store']);
    Route::middleware(['auth.permission:UPDATE_ROLE'])->put('/roles/{id}', [ControllerRoles::class, 'update']);
    Route::middleware(['auth.permission:DELETE_ROLE'])->delete('/roles/{id}', [ControllerRoles::class, 'destroy']);
});