<?php

namespace App\Services;

use App\Repositories\PermissionsRepository;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PermissionService {
    protected $permissionsRepository;

    public function __construct(PermissionsRepository $permissionsRepository) {
        $this->permissionsRepository = $permissionsRepository;
    }

    /**
     * Get permission list
     * @param int currentPage - Current page number
     * @param int perPage - Items per page number
     * @param string description - Permission description
     * @param string name - Permission name
     * @return array
     */
    public function searchPermission(int $currentPage, int $perPage, ?string $description, ?string $name): object {
        return $this->permissionsRepository->getPermissionList($currentPage, $perPage, $description, $name);
    }

}
