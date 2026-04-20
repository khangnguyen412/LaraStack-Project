<?php
namespace App\Repositories\interface;

interface UserRepositoryInterface {
    /**
     * Get user list
     * @return object|null
     */
    public function getUserList(): ?object;

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return object|null
     */
    public function findByEmailOrUserName(?string $email, ?string $username): ?object;

    /**
     * Get user profile with roles and permissions
     * @param string $uuid
     * @return object|null
     */
    public function getUserProfileWithRolesAndPermissions(string $uuid): ?object;
}
