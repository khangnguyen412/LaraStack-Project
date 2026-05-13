<?php
namespace App\Repositories\interface;

interface UserRepositoryInterface {
    /**
     * Get user list
     * @return object|null
     */
    public function searchUser(): ?object;

    /**
     * Find user by email or username
     * @param string $email
     * @param string $username
     * @return object|null
     */
    public function getUserByEmailOrUserName(?string $email, ?string $username): ?object;

    /**
     * Get user profile with roles and permissions
     * @param string $uuid
     * @return object|null
     */
    public function getUserProfileWithRolesAndPermissions(string $uuid): ?object;

    /**
     * Create user
     * @param array $data
     * @return object|null
     */
    public function createUser(array $data): ?object;

    /**
     * 
     */
    public function updateUser(string $uuid, array $data): ?object;

    /**
     * Delete user
     * @param string $uuid
     * @return bool|null
     */
    public function deleteUser(string $uuid): ?bool;
}
