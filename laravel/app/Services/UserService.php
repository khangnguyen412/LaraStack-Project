<?php

namespace App\Services;

use App\Repositories\UsersRepository;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
    public function profile(string $uid): array {
        $profile = $this->usersRepository->getUserProfileWithRolesAndPermissions($uid);
        if (!$profile) {
            throw new ModelNotFoundException("User not found");
        }

        $permissions = $profile->roles->permissions->pluck('name')->toArray();
        $profile = $profile->toArray();
        $profile['permissions'] = $permissions;

        // Delete roles.permissions from profile
        unset($profile['roles']['permissions']);
        return $profile;
    }

}
