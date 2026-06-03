<?php

namespace App\Services\Interface;

/**
 * Illuminate Package
 */
use Illuminate\Pagination\LengthAwarePaginator;

interface PermissionServiceInterface {
    /**
     * Get permission list
     * @param int currentPage - Current page number
     * @param int perPage - Items per page number
     * @param string description - Permission description
     * @param string name - Permission name
     * @return array
     */
    public function search(int $currentPage, int $perPage, ?string $description, ?string $name): LengthAwarePaginator;

    /**
     * Get permission by id
     * @param string id - Permission id
     * @return object|null
     */
    public function searchById(string $id): ?object;

    /**
     * Create permission
     * @param array data - Permission data
     * @return bool
     */
    public function create(array $data): ?object;

    /**
     * Update permission
     * @param string id - Permission id
     * @param array data - Permission data
     * @return bool
     */
    public function update(string $id, array $data): ?object;

    /**
     * Delete permission
     * @param string id - Permission id
     * @return bool
     */
    public function delete(string $id): bool;
}
