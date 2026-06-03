<?php
namespace App\Repositories\Interface;

/**
 * Illuminate
 */
use Illuminate\Support\Collection;
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
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator;

    /**
     * Function get role by id
     * @param string $id - Role id
     * @return ModelsRoles|null
     */
    public function searchById(string $id): ?ModelsRoles;

    /**
     * Count user by role id
     */
    public function countUserById(string $roleId): Collection;

    /**
     * Function create role
     * @param string $name - Role name
     * @param string $description - Role description
     * @param array $permissions - Role permissions
     * @return array
     */
    public function create(string $name, string $description, array $permissions): ?ModelsRoles;

    /**
     * Function update role
     */
    public function update(string $id, string $name, string $description, array $permissions): ?ModelsRoles;

    /**
     * Function delete role
     */
    public function delete(string $id): bool;
}
