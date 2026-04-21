<?php
namespace App\Repositories;

use Illuminate\Support\Str;

/**
 * Models
 */
use App\Models\ModelsUsers;

/**
 * Interface 
 */
use App\Repositories\interface\UserRepositoryInterface;

class UsersRepository extends BasesRepository implements UserRepositoryInterface {
    protected $model;

    public function __construct(ModelsUsers $model) {
        $this->model = $model;
    }

    /**
     * Get user list
     * @return object|null
     */
    public function getUserList(): ?object {
        return $this->model->get();
    }

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return object|null
     */
    public function getUserByEmailOrUserName(?string $email, ?string $username): ?object {
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

    /**
     * Create user
     * @param array $data
     * @return object|null
     */
    public function createUser(array $data): ?object {
    }
}