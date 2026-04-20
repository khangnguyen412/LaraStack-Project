<?php
namespace App\Repositories;

/**
 * Interface BaseRepositoryInterface
 */
use App\Repositories\interface\BaseRepositoryInterface;

abstract class BasesRepository implements BaseRepositoryInterface {
    protected $model;

    public function __construct($model) {
        $this->model = $model;
    }

    /**
     * Function pagination 
     * @param int $perPage
     * @param int $currentPage
     */
    public function pagination(int $perPage = 10, array $collumn = ["*"], string $pageName = 'page', ?int $currentPage = 1): ?object {
        return $this->model->paginate($perPage, $collumn, $pageName, $currentPage);
    }

}