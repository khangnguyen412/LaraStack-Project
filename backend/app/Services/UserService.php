<?php

namespace App\Services;

use App\Repositories\UsersRepository;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Exception;

class UserService {
    protected $usersRepository;

    public function __construct(UsersRepository $usersRepository) {
        $this->usersRepository = $usersRepository;
    }

    /**
     * Get user profile
     * @param string $uid - User uuid
     * @return array
     */
    public function currentUser(string $uid): object {
        $profile = $this->usersRepository->getUserProfileWithRolesAndPermissions($uid);
        if (!$profile) {
            throw new ModelNotFoundException("User not found");
        }
        return $profile;
    }

    /**
     * Find user by email
     * @param string $email - User email
     * @return object|null
     */
    public function searchByEmailUser(string $email): ?object {
        return $this->usersRepository->getUserByEmail($email);
    }

    /**
     * Create permission
     * @param array $data
     * @return object|null
     */
    public function createUser(array $data): ?object {
    }

}
