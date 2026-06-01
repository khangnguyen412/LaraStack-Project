<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Carbon
 */
use Carbon\Carbon;

/**
 * Job
 */
use App\Jobs\SendResetPassJob;

/**
 * Repository
 */
use App\Repositories\UsersRepository;

/**
 * Interface
 */
use App\Services\interface\AuthServiceInterface;

/**
 * Service
 */
use App\Services\RoleService;


class AuthService implements AuthServiceInterface {
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
        $user = $this->usersRepository->getUserByEmailOrUserName($email ?? null, $username ?? null);

        if (!$user) {
            throw ValidationException::withMessages(['username' => ['User not found']]);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            throw new AuthenticationException('Invalid password');
        }

        $token = auth()->guard('api')->attempt($credentials);

        if (!$token) {
            throw new AuthenticationException('Invalid credentials');
        }

        $profile = $this->usersRepository->getUserProfileWithRolesAndPermissions(auth()->user()->uuid);

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

    /**
     * Forgot password
     */
    public function forgotPassword(string $email): void {
        $user = $this->usersRepository->getUserByEmail($email);
        if (!$user) {
            throw new ModelNotFoundException("User not found");
        }
        $token = Str::random(64);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => bcrypt($token), 'created_at' => Carbon::now()]
        );
        SendResetPassJob::dispatch($user, $token);
    }

    /**
     * Reset password
     */
    public function resetPassword(string $token, string $email, string $password): string {
        $status = Password::reset([
            'token'    => $token,
            'email'    => $email,
            'password' => $password,
        ], function ($user, $plainPassword) {
            $this->usersRepository->updatePassword($user->email, Hash::make($plainPassword));
        });
        return $status;
    }

}
