<?php
namespace App\Services\Interface;

/**
 * Illuminate Package
 */
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Models
 */
use App\Models\ModelsUsers;

interface UserServiceInterface {
    /**
     * Get all users
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Get user profile
     * @param string $uid - User uuid
     * @return object
     */
    public function current(string $uid): object;

    /**
     * Search user profile
     * @param int $currentPage - Current page number
     * @param int $perPage - Per page number
     * @param string|null $name - Role name
     * @param string|null $description - Role description
     * @return LengthAwarePaginator
     */
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator;

    /**
     * Get user by email
     * @param string $email - User email
     * @return object|null - User profile or null
     */
    public function searchByEmail(string $email): ?ModelsUsers;

    /**
     * Create user
     * @param array $data - User data
     * @return object|null - User profile or null
     */
    public function create(array $data): ?object;

    /**
     * Update user
     * @param string $uid - User uuid
     * @param array $data - User data
     * @return object|null - User profile or null
     */
    public function update(string $uid, array $data): ?object;

    /**
     * Delete user
     * @param string $uid - User uuid
     * @return bool
     */
    public function delete(string $uid): ?bool;
}
