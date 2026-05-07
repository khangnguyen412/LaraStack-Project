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
use App\Repositories\PermissionsRepository;

/**
 * Interface 
 */
use App\Services\interface\PermissionServiceInterface;

class PermissionService implements PermissionServiceInterface {
    protected $permissionsRepository;

    public function __construct(PermissionsRepository $permissionsRepository) {
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
    public function searchPermission(int $currentPage, int $perPage, ?string $description, ?string $name): LengthAwarePaginator {
        $cacheKey = "permissions_page{$currentPage}_per{$perPage}_desc{$description}_name{$name}";
        return Cache::tags(['permissions'])->remember($cacheKey, 300, fn() => $this->permissionsRepository->searchPermission($currentPage, $perPage, $description, $name));
    }

    /**
     * Get permission by id
     * @param string id - Permission id
     * @return object|null
     */
    public function searchByIdPermission(string $id): ?ModelsPermissions {
        $cacheKey = "permission_id_{$id}";
        return Cache::tags(['permissions'])->remember($cacheKey, 300, fn() => $this->permissionsRepository->searchByIdPermission($id));
    }

    /**
     * Create permission
     * @param array data - Permission data
     * @return bool
     */
    public function createPermission(array $data): ?ModelsPermissions {
        $permission = $this->permissionsRepository->createPermission($data);
        Cache::tags(['permissions'])->flush();
        return $permission;
    }

    /**
     * Update permission
     * @param string id - Permission id
     * @param array data - Permission data
     * @return bool
     */
    public function updatePermission(string $id, array $data): ?ModelsPermissions {
        $permission = $this->permissionsRepository->updatePermission($id, $data);
        Cache::tags(['permissions'])->flush();
        return $permission;
    }

    /**
     * Delete permission
     * @param string id - Permission id
     * @return bool
     */
    public function deletePermission(string $id): bool {
        $this->permissionsRepository->deletePermission($id);
        Cache::tags(['permissions'])->flush();
        return true;
    }
}
