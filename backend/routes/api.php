<?php
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

require_once __DIR__ . '/v1/auth.php';
require_once __DIR__ . '/v1/users.php';
require_once __DIR__ . '/v1/roles.php';
require_once __DIR__ . '/v1/permissions.php';
require_once __DIR__ . '/v1/payment.php';