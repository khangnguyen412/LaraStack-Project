<?php
namespace App\Repositories\interface;

interface PermissionRepositoryInterface {
    /**
     * Get permission list
     * @param int $currentPage
     * @param int $perPage
     * @return object|null
     */
    public function getPermissionList(int $currentPage, int $perPage, ?string $description, ?string $name): ?object;
}
