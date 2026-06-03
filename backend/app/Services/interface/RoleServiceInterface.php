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
use App\Models\ModelsRoles;

interface RoleServiceInterface {
    /**
     * Search role profile
     * @param int $currentPage - Current page number
     * @param int $perPage - Per page number
     * @param string|null $name - Role name
     * @param string|null $description - Role description
     * @return LengthAwarePaginator
     */
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator;

    /**
     * Get role by id
     * @param string $id - Role id
     * @return object|null - Role profile or null
     */
    public function searchById(string $id): ?ModelsRoles;

    /**
     * Count user by role id
     * @param string $roleId - Role id
     * @return Collection
     */
    public function countUserById(string $roleId): Collection;

    /**
     * Create role
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function create(array $data): ?object;

    /**
     * Update role
     * @param string $id - Role id
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function update(string $id, array $data): ?object;

    /**
     * Delete role
     * @param string $id - Role id
     * @return bool
     */
    public function delete(string $id): bool;
}
