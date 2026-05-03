<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ControllerPermissions;

Route::prefix('/admin')->middleware(["jwt.cookie","auth:api"])->group(function () {
    /** Role */
    Route::middleware(['auth.permission:READ_PERMISSION'])->apiResource('/permissions', ControllerPermissions::class);
});