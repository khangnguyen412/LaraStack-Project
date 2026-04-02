<?php

namespace App\Repositories;

use App\Models\ModelsUsers;

class UsersRepository {
    protected $model;

    public function __construct(ModelsUsers $model) {
        $this->model = $model;
    }

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return object|null
     */
    public function findByEmailOrUserName(?string $email, ?string $username): ?object {
        return $this->model->where('email', $email)->orWhere('user_name', $username)->first();
    }

    /**
     * Get user profile with roles and permissions
     * @param string $uuid
     * @return object|null
     */
    public function getUserProfileWithRolesAndPermissions(string $uuid): ?object {
        return $this->model->with('roles.permissions')->find($uuid);
    }
}