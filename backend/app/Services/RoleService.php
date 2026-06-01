<?php

namespace App\Services;

use Exception;

/**
 * Illuminate Package
 */
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Models
 */
use App\Models\ModelsRoles;

/**
 * Repository
 */
use App\Repositories\RolesRepository;

/**
 * Interface
 */
use App\Services\interface\RoleServiceInterface;

class RoleService implements RoleServiceInterface {
    protected $rolesRepository;

    public function __construct(RolesRepository $rolesRepository) {
        $this->rolesRepository = $rolesRepository;
    }

    /**
     * Search role profile
     * @param int $currentPage - Current page number
     * @param int $perPage - Per page number
     * @param string|null $name - Role name
     * @param string|null $description - Role description
     * @return LengthAwarePaginator
     */
    public function searchRole(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator {
        $key = "role_search_{$currentPage}_{$perPage}_{$name}_{$description}";
        $cacheKey = 300;
        $roles = $this->rolesRepository->searchRole($currentPage, $perPage, $name, $description);
        $roles->each(function ($role) {
            $role->userCount = $this->countUserByRoleId($role->id)->count();
        });
        return Cache::tags('roles')->remember($key, $cacheKey, fn() => ($roles));
    }

    /**
     * Get role by id
     * @param string $id - Role id
     * @return ModelsRoles|null - Role profile or null
     */
    public function searchByIdRole(string $id): ?ModelsRoles {
        $key = "role_search_by_id_{$id}";
        $cacheKey = 300;
        return Cache::tags('roles')->remember($key, $cacheKey, fn() => ($this->rolesRepository->searchByIdRole($id)));
    }

    /**
     * Count user by role id
     * @param string $roleId - Role id
     * @return Collection
     */
    public function countUserByRoleId(string $roleId): Collection {
        return $this->rolesRepository->countUserByRoleId($roleId);
    }

    /**
     * Create role
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function createRole(array $data): ?object {
        $role = $this->rolesRepository->createRole($data['name'], $data['description'], $data['permissions']);
        Cache::tags('roles')->flush();
        return $role;
    }

    /**
     * Update role
     * @param string $id - Role id
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function updateRole(string $id, array $data): ?object {
        $role = $this->rolesRepository->updateRole($id, $data['name'], $data['description'], $data['permissions']);
        Cache::tags('roles')->flush();
        return $role;
    }

    /**
     * Delete role
     * @param string $id - Role id
     * @return bool
     */
    public function deleteRole(string $id): bool {
        $this->rolesRepository->deleteRole($id);
        Cache::tags('roles')->flush();
        return true;
    }

}
