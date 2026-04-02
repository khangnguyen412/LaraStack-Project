<?php

namespace App\Repositories;

use App\Models\ModelsPermissions;
use App\Repositories\BasesRepository;

class PermissionsRepository extends BasesRepository {
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