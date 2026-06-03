<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Model
 */
use App\Models\ModelsPermissions as ModelsPermissions;

/**
 * Repository
 */
use App\Repositories\Interface\PermissionRepositoryInterface;

/**
 * Interface 
 */
use App\Services\Interface\PermissionServiceInterface;

class PermissionService implements PermissionServiceInterface {
    protected $permissionsRepository;

    public function __construct(PermissionRepositoryInterface $permissionsRepository) {
        $this->permissionsRepository = $permissionsRepository;
    }

    /**
     * Get permission list
     * @param int currentPage - Current page number
     * @param int perPage - Items per page number
     * @param string description - Permission description
     * @param string name - Permission name
     * @return LengthAwarePaginator
     */
    public function search(int $currentPage, int $perPage, ?string $description, ?string $name): LengthAwarePaginator {
        $cacheKey = "permissions_page{$currentPage}_per{$perPage}_desc{$description}_name{$name}";
        return Cache::tags(['permissions'])->remember($cacheKey, 300, fn() => $this->permissionsRepository->search($currentPage, $perPage, $description, $name));
    }

    /**
     * Get permission by id
     * @param string id - Permission id
     * @return object|null
     */
    public function searchById(string $id): ?ModelsPermissions {
        $cacheKey = "permission_id_{$id}";
        return Cache::tags(['permissions'])->remember($cacheKey, 300, fn() => $this->permissionsRepository->searchById($id));
    }

    /**
     * Create permission
     * @param array data - Permission data
     * @return bool
     */
    public function create(array $data): ?ModelsPermissions {
        $permission = $this->permissionsRepository->create($data);
        Cache::tags(['permissions'])->flush();
        return $permission;
    }

    /**
     * Update permission
     * @param string id - Permission id
     * @param array data - Permission data
     * @return bool
     */
    public function update(string $id, array $data): ?ModelsPermissions {
        $permission = $this->permissionsRepository->update($id, $data);
        Cache::tags(['permissions'])->flush();
        return $permission;
    }

    /**
     * Delete permission
     * @param string id - Permission id
     * @return bool
     */
    public function delete(string $id): bool {
        $this->permissionsRepository->delete($id);
        Cache::tags(['permissions'])->flush();
        return true;
    }
}
