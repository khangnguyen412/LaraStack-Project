<?php
namespace App\Services\interface;

/**
 * Illuminate Package
 */
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
    public function searchRole(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator;

    /**
     * Get role by id
     * @param string $id - Role id
     * @return object|null - Role profile or null
     */
    public function searchByIdRole(string $id): ?ModelsRoles;

    /**
     * Create role
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function createRole(array $data): ?object;

    /**
     * Update role
     * @param string $id - Role id
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function updateRole(string $id, array $data): ?object;

    /**
     * Delete role
     * @param string $id - Role id
     * @return bool
     */
    public function deleteRole(string $id): bool;
}
