<?php
namespace App\Repositories;

/**
 * Illuminate
 */
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Models
 */
use App\Models\ModelsPermissions;

/**
 * Interface 
 */
use App\Repositories\Interface\PermissionRepositoryInterface;

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
    public function search(int $currentPage, int $perPage, ?string $description, ?string $name): ?LengthAwarePaginator {
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
     * Get permission by id
     * @param string $id
     * @return object|null
     */
    public function searchById(string $id): ?ModelsPermissions {
        return $this->model->find($id);
    }

    /**
     * Create permission
     * @param array $data
     * @return bool
     */
    public function create(array $data): ?ModelsPermissions {
        $result = $this->model->create($data);
        return $result ?? null;

    }

    /**
     * Update permission
     * @param string $id
     * @param array $data
     * @return bool
     */
    public function update(string $id, array $data): ?ModelsPermissions {
        $permission = $this->searchById($id);
        if (!$permission) {
            throw new ModelNotFoundException('Permission not found');
        }
        $permission->update($data);
        return $permission;
    }

    /**
     * Delete permission
     */
    public function delete(string $id): bool {
        $permission = $this->searchById($id);
        if (!$permission) {
            throw new ModelNotFoundException('Permission not found');
        }
        $permission->delete();
        return true;
    }

}