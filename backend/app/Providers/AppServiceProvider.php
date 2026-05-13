<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * Payment gateway interface
 */
use App\Contracts\PaymentGateway;

/**
 * Payment gateway services
 */
use App\Services\Payments\VNPayGateway;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $gateway = config('payment.default', 'vnpay');
        $this->app->bind(PaymentGateway::class, fn() => match ($gateway) { default => new VNPayGateway(), });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        //
    }

}
