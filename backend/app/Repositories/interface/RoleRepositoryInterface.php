<?php 
namespace App\Repositories\Interface;

interface RoleRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Function all
     * @return array
     */
    public function getRoleList(): ?object;
}
