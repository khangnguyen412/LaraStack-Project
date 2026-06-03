<?php

namespace App\Services;

use Exception;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;


/**
 * Models
 */
use App\Models\ModelsUsers;

/****
 * Repository
 */
use App\Repositories\UsersRepository;

/**
 * Interface
 */
use App\Services\Interface\UserServiceInterface;


class UserService implements UserServiceInterface {
    protected $usersRepository;

    public function __construct(UsersRepository $usersRepository) {
        $this->usersRepository = $usersRepository;
    }

    /**
     * Get all users
     * @return Collection
     */
    public function all(): Collection {
        return $this->usersRepository->search();
    }

    /**
     * Get user profile
     * @param string $uid - User uuid
     * @return array
     */
    public function current(string $uid): object {
        $profile = $this->usersRepository->getProfileWithRolesAndPermissions($uid);
        if (!$profile) {
            throw new ModelNotFoundException("User not found");
        }
        return $profile;
    }

    /**
     * Search user profile
     * @param int $currentPage - Current page number
     * @param int $perPage - Per page number
     * @param string|null $name - Role name
     * @param string|null $description - Role description
     * @return LengthAwarePaginator
     */ 
    public function search(int $currentPage, int $perPage, ?string $name, ?string $description): ?LengthAwarePaginator {}

    /**
     * Find user by email
     * @param string $email - User email
     * @return object|null
     */
    public function searchByEmail(string $email): ?ModelsUsers {
        return $this->usersRepository->getByEmail($email);
    }

    /**
     * Create user
     * @param array $data
     * @return object|null
     */
    public function create(array $data): ?object {
    }

    /**
     * Update user
     * @param string $uid - User uuid
     * @param array $data - User data
     * @return object|null - User profile or null
     */ 
    public function update(string $uid, array $data): ?object {}

    /**
     * Delete user
     * @param string $uid - User uuid
     * @return bool|null
     */
    public function delete(string $uid): ?bool {}
}
