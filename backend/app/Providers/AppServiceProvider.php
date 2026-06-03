<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * Repository interface
 */
use App\Repositories\Interface\UserRepositoryInterface;
use App\Repositories\UsersRepository;
use App\Repositories\Interface\RoleRepositoryInterface;
use App\Repositories\RolesRepository;
use App\Repositories\Interface\PermissionRepositoryInterface;
use App\Repositories\PermissionsRepository;

/**
 * Service interface
 */
use App\Services\Interface\AuthServiceInterface;
use App\Services\AuthService;
use App\Services\Interface\UserServiceInterface;
use App\Services\UserService;
use App\Services\Interface\RoleServiceInterface;
use App\Services\RoleService;
use App\Services\Interface\PermissionServiceInterface;
use App\Services\PermissionService;

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

        // Bind Service
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(RoleServiceInterface::class, RoleService::class);
        $this->app->bind(PermissionServiceInterface::class, PermissionService::class);

        // Bind Repository
        $this->app->bind(UserRepositoryInterface::class, UsersRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RolesRepository::class);
        $this->app->bind(PermissionRepositoryInterface::class, PermissionsRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        //
    }

}
