<?php

namespace App\Repositories;

use App\Models\ModelsRoles;

class RolesRepository {
    protected $model;

    public function __construct(ModelsRoles $model) {
        $this->model = $model;
    }

    /**
     * Get role list
     * @return object|null
     */
    public function getRoleList(): ?object {
        return $this->model->get();
    }
}