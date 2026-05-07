<?php
namespace App\Repositories\Interface;

/**
 * Illuminate
 */
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Models
 */
use App\Models\ModelsRoles;

interface RoleRepositoryInterface extends BaseRepositoryInterface {
    /**
     * Function search role list
     * @param int $currentPage
     * @param int $perPage
     * @param string|null $name
     * @param string|null $description
     * @return object
     */
    public function searchRole(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator;

    /**
     * Function get role by id
     * @param string $id - Role id
     * @return ModelsRoles|null
     */
    public function searchByIdRole(string $id): ?ModelsRoles;

    /**
     * Function create role
     * @param string $name - Role name
     * @param string $description - Role description
     * @param array $permissions - Role permissions
     * @return array
     */
    public function createRole(string $name, string $description, array $permissions): ?ModelsRoles;

    /**
     * Function update role
     */
    public function updateRole(string $id, string $name, string $description, array $permissions): ?ModelsRoles;

    /**
     * Function delete role
     */
    public function deleteRole(string $id): bool;
}
