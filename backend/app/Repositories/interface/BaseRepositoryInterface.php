<?php
namespace App\Repositories\Interface;

interface BaseRepositoryInterface {
    /**
     * Function all
     * @return array
     */
    public function pagination(int $perPage = 10, array $collumn = ["*"], string $pageName = 'page', ?int $currentPage = 1): ?object;
}
