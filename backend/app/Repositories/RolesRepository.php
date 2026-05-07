<?php
namespace App\Repositories;

/**
 * Illuminate
 */
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
    public function searchRole(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator {
        /**
         * Create query instance
         */
        $query = $this->model->newQuery();
        if (filled($name)) {
            $query->where('name', 'like', "%{$name}%");
        }
        if (filled($description)) {
            $query->where('description', 'like', "%{$description}%");
        }
        return $query->paginate($perPage, ['*'], 'page', $currentPage);
    }

    /**
     * Get role by id
     */
    public function searchByIdRole(string $id): ?ModelsRoles {
        return $this->model->with('permissions')->find($id);
    }

    /**
     * Create role
     */
    public function createRole(string $name, string $description, array $permissions): ?ModelsRoles {
        return DB::transaction(function () use ($name, $description, $permissions) {
            $role = $this->model->create([
                'name'        => $name,
                'description' => $description,
            ]);
            $role->permissions()->sync($permissions);
            return $role->load(['permissions']);
        });
    }

    /**
     * Update role
     */
    public function updateRole(string $id, string $name, string $description, array $permissions): ?ModelsRoles {
        return DB::transaction(function () use ($id, $name, $description, $permissions) {
            $role = $this->model->findOrFail($id);
            $role->update([
                'name'        => $name ?? $role->getAttribute('name'),
                'description' => $description ?? $role->getAttribute('description'),
            ]);
            if (filled($permissions)) {
                $role->permissions()->sync($permissions);
            }
            return $role->fresh()->load(['permissions']);
        });
    }

    /**
     * Delete role
     */
    public function deleteRole(string $id): bool {
        return DB::transaction(
            fn() => ($this->model->findOrFail($id)->delete())
        );
    }

}