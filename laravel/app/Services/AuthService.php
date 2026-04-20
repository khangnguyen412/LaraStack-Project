<?php

namespace App\Services;

use App\Repositories\UsersRepository;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuthService {
    protected $usersRepository;

    public function __construct(UsersRepository $usersRepository) {
        $this->usersRepository = $usersRepository;
    }

    /**
     * Login user
     * @param array $credentials
     * @param string $email
     * @return array
     */
    public function login(array $credentials, ?string $email, ?string $username): array {
        $user = $this->usersRepository->findByEmailOrUserName($email ?? null, $username ?? null);

        if (!$user) {
            throw ValidationException::withMessages(['username' => ['User not found']]);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            throw new AuthenticationException('Invalid password');
        }

        $token = auth()->attempt($credentials);
        if (!$token) {
            throw new AuthenticationException('Invalid credentials');
        }

        $profile = $this->usersRepository->getUserProfileWithRolesAndPermissions(auth()->user()->uuid);
        ;

        // Return array
        return [
            'token'   => $token,
            'profile' => $profile
        ];
    }

    /**
     * Logout user
     * @return void
     */
    public function logout(): void {
        auth('api')->logout();
    }

}
