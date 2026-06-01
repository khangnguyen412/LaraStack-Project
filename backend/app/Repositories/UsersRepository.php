<?php
namespace App\Repositories;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;


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
    public function searchUser(): ?object {
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
     * Find user by email or username
     * @param string $email
     * @return object|null
     */
    public function getUserByEmail(?string $email): ?object {
        return $this->model->where('email', $email)->first();
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

    /**
     * Update user
     * @param string $uuid
     * @param array $data
     * @return object|null
     */
    public function updateUser(string $uuid, array $data): ?object {
    }

    /**
     * Update user password
     * @param string $email
     * @param string $password
     * @return bool|null
     */
    public function updatePassword(string $email, string $password): ?int {
        $user = $this->model->where('email', $email)->firstOrFail();
        $data = [
            'password'            => $password,
            'password_changed_at' => now(),
        ];

        /**
         * if user table has remember_token column, then set remember_token to null
         */
        if (Schema::hasColumn($user->getTable(), 'remember_token')) {
            $data['remember_token'] = null;
        }
        $user->forceFill($data);
        return $user->save() ? 1 : 0;
    }

    /**
     * Delete user
     * @param string $uuid
     * @return bool|null
     */
    public function deleteUser(string $uuid): ?bool {
    }

}
