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
use App\Repositories\Interface\RoleRepositoryInterface;

/**
 * Interface
 */
use App\Services\Interface\RoleServiceInterface;

class RoleService implements RoleServiceInterface {
    protected $rolesRepository;

    public function __construct(RoleRepositoryInterface $rolesRepository) {
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
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator {
        $key = "role_search_{$currentPage}_{$perPage}_{$name}_{$description}";
        $cacheKey = 300;
        $roles = $this->rolesRepository->search($currentPage, $perPage, $name, $description);
        $roles->each(function ($role) {
            $role->userCount = $this->countUserById($role->id)->count();
        });
        return Cache::tags('roles')->remember($key, $cacheKey, fn() => ($roles));
    }

    /**
     * Get role by id
     * @param string $id - Role id
     * @return ModelsRoles|null - Role profile or null
     */
    public function searchById(string $id): ?ModelsRoles {
        $key = "role_search_by_id_{$id}";
        $cacheKey = 300;
        return Cache::tags('roles')->remember($key, $cacheKey, fn() => ($this->rolesRepository->searchById($id)));
    }

    /**
     * Count user by role id
     * @param string $roleId - Role id
     * @return Collection
     */
    public function countUserById(string $roleId): Collection {
        return $this->rolesRepository->countUserById($roleId);
    }

    /**
     * Create role
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function create(array $data): ?object {
        $role = $this->rolesRepository->create($data['name'], $data['description'], $data['permissions']);
        Cache::tags('roles')->flush();
        return $role;
    }

    /**
     * Update role
     * @param string $id - Role id
     * @param array $data - Role data
     * @return object|null - Role profile or null
     */
    public function update(string $id, array $data): ?object {
        $role = $this->rolesRepository->update($id, $data['name'], $data['description'], $data['permissions']);
        Cache::tags('roles')->flush();
        return $role;
    }

    /**
     * Delete role
     * @param string $id - Role id
     * @return bool
     */
    public function delete(string $id): bool {
        $this->rolesRepository->delete($id);
        Cache::tags('roles')->flush();
        return true;
    }

}
