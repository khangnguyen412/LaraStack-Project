<?php
namespace App\Repositories;

/**
 * Models
 */
use App\Models\ModelsRoles;

/**
 * Interface 
 */
use App\Repositories\Interface\RoleRepositoryInterface;

class RolesRepository extends BasesRepository implements RoleRepositoryInterface {
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