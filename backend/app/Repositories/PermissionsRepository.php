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
    public function getPermissionList(int $currentPage, int $perPage, ?string $description, ?string $name): ?object {
        /**
         * Create query instance
         */
        $query = $this->model->newQuery();
        if ($name) {
            $query->where('name', 'like', "%{$name}%");
        }
        if ($description) {
            $query->where('description', 'like', "%{$description}%");
        }
        return $query->paginate($perPage, ['*'], 'page', $currentPage);
    }

}