<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerRoles;

Route::prefix('/admin')->middleware(["jwt.cookie","auth:api"])->group(function () {
    /** Role */
    Route::middleware(['auth.permission:READ_ROLE'])->apiResource('/roles', ControllerRoles::class)->only(['index']);
});