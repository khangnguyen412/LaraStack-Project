<?php
return [
    'default' => env('PAYMENT_GATEWAY', 'vnpay'),
    'vnpay' => [
        'tmn_code'    => env('VNP_TMN_CODE'),
        'hash_secret' => env('VNP_HASH_SECRET'),
        'url'         => env('VNP_URL'),
        'return_url'  => env('VNP_RETURN_URL'),
        'ipn_url'     => env('VNP_IPN_URL'),
    ],
    'momo'  => [
        'partner_code' => env('MOMO_PARTNER_CODE'),
        'access_key'   => env('MOMO_ACCESS_KEY'),
        'secret_key'   => env('MOMO_SECRET_KEY'),
        'endpoint'     => env('MOMO_ENDPOINT'),
        'return_url'   => env('MOMO_RETURN_URL'),
        'ipn_url'      => env('MOMO_IPN_URL'),
    ],
];