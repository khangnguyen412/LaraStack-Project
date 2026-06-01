<?php

namespace App\Services\interface;

interface AuthServiceInterface {
    /**
     * Login user
     * @param array $credentials
     * @param string $email
     * @return array
     */
    public function login(array $credentials, ?string $email, ?string $username): array;

    /**
     * Logout user
     * @return void
     */
    public function logout(): void;

    /**
     * Forgot password
     */
    public function forgotPassword(string $email): void;

    /**
     * Reset password
     */
    public function resetPassword(string $token, string $password, string $email): string;
}
