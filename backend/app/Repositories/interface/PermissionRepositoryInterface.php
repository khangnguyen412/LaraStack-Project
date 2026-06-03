<?php
namespace App\Repositories\Interface;

/**
 * Illuminate
 */
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Models
 */
use App\Models\ModelsPermissions;

interface PermissionRepositoryInterface {
    /**
     * Get permission list
     * @param int $currentPage
     * @param int $perPage
     * @return object|null
     */
    public function search(int $currentPage, int $perPage, ?string $description, ?string $name): ?LengthAwarePaginator;


    /**
     * Get permission by id
     * @param string $id
     * @return object|null
     */
    public function searchById(string $id): ?ModelsPermissions;

    /**
     * Create permission
     * @param array $data
     * @return bool
     */
    public function create(array $data): ?ModelsPermissions;

    /**
     * Update permission
     * @param string $id
     * @param array $data
     * @return bool
     */
    public function update(string $id, array $data): ?ModelsPermissions;

    /**
     * Delete permission
     * @param string $id
     * @return bool
     */
    public function delete(string $id): bool;
}
