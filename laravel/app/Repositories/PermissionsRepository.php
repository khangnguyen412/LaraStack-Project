<?php
namespace App\Repositories;

/**
 * Models
 */
use App\Models\ModelsPermissions;

/**
 * Interface 
 */
use App\Repositories\interface\PermissionRepositoryInterface;

class PermissionsRepository extends BasesRepository implements PermissionRepositoryInterface {
    protected $model;
    protected function setModel() {
        return ModelsPermissions::class;
    }

    public function __construct(ModelsPermissions $model) {
        $this->model = $model;
    }

    /**
     * Get role list
     * @return object|null
     */
    public function getPermissionList(int $currentPage, int $perPage): ?object {
        return $this->model->paginate($perPage, ['*'], 'page', $currentPage);
    }

}