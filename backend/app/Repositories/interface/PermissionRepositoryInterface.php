<?php
namespace App\Repositories\interface;

interface PermissionRepositoryInterface {
    /**
     * Get permission list
     * @param int $currentPage
     * @param int $perPage
     * @return object|null
     */
    public function searchPermission(int $currentPage, int $perPage, ?string $description, ?string $name): ?object;


    /**
     * Get permission by id
     * @param string $id
     * @return object|null
     */
    public function searchByIdPermission(string $id): ?object;

    /**
     * Create permission
     * @param array $data
     * @return bool
     */
    public function createPermission(array $data): ?object;

    /**
     * Update permission
     * @param string $id
     * @param array $data
     * @return bool
     */
    public function updatePermission(string $id, array $data): ?object;

    /**
     * Delete permission
     * @param string $id
     * @return bool
     */
    public function deletePermission(string $id): bool;
}
