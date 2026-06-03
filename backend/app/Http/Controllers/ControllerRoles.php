<?php

namespace App\Http\Controllers;

use Exception;

/**
 * Illuminate Package
 */
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Repository
 */
use App\Repositories\RolesRepository;

/**
 * Service
 */
use App\Services\Interface\RoleServiceInterface;

/**
 * Resource
 */
use App\Http\Resources\Roles\RolesSearch;
use App\Http\Resources\Roles\RolesDelete;
use App\Http\Resources\Roles\RolesUpdate;
use App\Http\Resources\Roles\RolesCreate;

#[OA\Tag(name: 'Roles', description: 'Role management')]
class ControllerRoles extends Controller {
    protected $roleService;

    public function __construct(RoleServiceInterface $roleService) {
        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/roles',
        summary: 'Get role list',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        parameters: [
            new OA\Parameter(name: 'perPage', in: 'query', description: 'Number of items per page', required: false, schema: new OA\Schema(type: 'integer', example: 10)),
            new OA\Parameter(name: 'currentPage', in: 'query', description: 'Current page number', required: false, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/RolesSearch'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function index(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'perPage'     => 'nullable|integer|min:1',
                'currentPage' => 'nullable|integer|min:1',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $perPage = $request->input('perPage', 10);
            $currentPage = $request->input('currentPage', 1);
            $name = $request->input('name', null);
            $description = $request->input('description', null);
            $roles = $this->roleService->search($currentPage, $perPage, $name, $description);
            return RolesSearch::collection($roles);
        } catch (ValidationException $e) {
            throw $e;
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
    #[OA\Post(
        path: '/api/v1/admin/roles',
        summary: 'Create role',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/RolesCreate'),
        responses: [
            new OA\Response(response: 201, ref: '#/components/responses/RolesCreate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function store(Request $request) {
        try {
            $inputs = $request->input('data', $request->all());
            $validator = Validator::make($inputs, [
                'name'        => 'required|string|max:255|unique:roles,name',
                'description' => 'nullable|string|max:255',
                'permissions' => 'nullable|array',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $this->roleService->create($inputs);
            return RolesCreate::make(['message' => 'success']);
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/roles/{id}',
        summary: 'Get role by id',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Role id', required: true, schema: new OA\Schema(type: 'string', example: '1')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/RolesGetById'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function show(string $id) {
        try {
            $role = $this->roleService->searchById($id);
            return RolesSearch::make($role);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Role not found");
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
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
    #[OA\Put(
        path: '/api/v1/admin/roles/{id}',
        summary: 'Update role',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Role id', required: true, schema: new OA\Schema(type: 'string', example: '1')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/RolesUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/RolesUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function update(Request $request, string $id) {
        try {
            $inputs = $request->input('data', $request->all());
            $validator = Validator::make($inputs, [
                'name'          => 'sometimes|string|max:255',
                'description'   => 'sometimes|string|max:255',
                'permissions'   => 'nullable|array',
                'permissions.*' => 'required|integer|exists:permissions,id',
            ]);
            if ($validator->fails()) {
                throw new ValidationException($validator);
            }
            $role = $this->roleService->update($id, $inputs);
            return RolesSearch::make($role);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException('Role not found');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Delete(
        path: '/api/v1/admin/roles/{id}',
        summary: 'Delete role',
        security: [['bearerAuth' => []]],
        tags: ['Roles'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Role id', required: true, schema: new OA\Schema(type: 'string', example: '1')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/RolesDelete'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function destroy(string $id) {
        try {
            $this->roleService->delete($id);
            return RolesDelete::make(['message' => 'success']);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException("Role not found");
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
