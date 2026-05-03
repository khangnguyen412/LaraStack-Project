<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Repository
 */
use App\Repositories\RolesRepository;

/**
 * Resource
 */
use App\Http\Resources\RolesResource;

#[OA\Tag(name: 'Roles', description: 'Role management')]
class ControllerRoles extends Controller {
    protected $rolesRepository;

    public function __construct(RolesRepository $rolesRepository) {
        $this->rolesRepository = $rolesRepository;
    }

    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/roles',
        summary: 'Get role list',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetRolesList'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
        ]
    )]
    public function index() {
        try {
            $roles_list = $this->rolesRepository->getRoleList();
            return RolesResource::collection($roles_list);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
