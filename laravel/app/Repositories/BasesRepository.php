<?php

namespace App\Repositories;

abstract class BasesRepository {
    protected $model;

    public function __construct($model) {
        $this->model = $model;
    }

    // Must be implemented in child class
    abstract protected function setModel();

    /**
     * Function pagination 
     * @param int $perPage
     * @param int $currentPage
     */
    public function pagination(int $perPage = 10, array $collumn = ["*"], string $pageName = 'page', ?int $currentPage = 1): object {
        return $this->model->paginate($perPage, $collumn, $pageName, $currentPage);
    }
}