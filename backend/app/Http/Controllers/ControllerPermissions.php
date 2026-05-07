<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Repository
 */
use App\Repositories\PermissionsRepository;

/**
 * Service
 */
use App\Services\PermissionService;

/**
 * Resource
 */
use App\Http\Resources\Permissions\PermissionsSearch;
use App\Http\Resources\Permissions\PermissionsCreate;
use App\Http\Resources\Permissions\PermissionsDelete;

#[OA\Tag(name: 'Permissions', description: 'Permission management')]
class ControllerPermissions extends Controller {
    protected $permissionService;

    public function __construct(PermissionService $permissionService) {
        $this->permissionService = $permissionService;
    }

    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/permissions',
        summary: 'Get permission list',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'perPage', in: 'query', description: 'Number of items per page', required: false, schema: new OA\Schema(type: 'integer', example: 10)),
            new OA\Parameter(name: 'currentPage', in: 'query', description: 'Current page number', required: false, schema: new OA\Schema(type: 'integer', example: 1)),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsSearch'),
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
            $currentPage = $request->input('currentPage', 1);
            $perPage = $request->input('perPage', 10);
            $description = $request->input('description', null);
            $name = $request->input('name', null);
            $permissions = $this->permissionService->searchPermission($currentPage, $perPage, $description, $name);
            return PermissionsSearch::collection($permissions);
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
        path: '/api/v1/admin/permissions',
        summary: 'Create permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/PermissionsCreate'),
        responses: [
            new OA\Response(response: 201, ref: '#/components/responses/PermissionsCreate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function store(Request $request) {
        try {
            $valid = Validator::make($request->all(), [
                'name'        => 'required|string|max:255|unique:permissions,name',
                'description' => 'nullable|string|max:255',
            ]);
            if ($valid->fails()) {
                throw new ValidationException($valid);
            }
            $data = $request->all();
            $permission = $this->permissionService->createPermission($data);
            return new PermissionsCreate($permission);
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
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Get permission by id',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '1')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsGetById'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function show(string $id) {
        try {
            $permission = $this->permissionService->searchByIdPermission($id);
            if (!$permission) {
                throw new ModelNotFoundException('Permission not found');
            }
            return PermissionsSearch::make($permission);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException($e->getMessage());
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
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Update permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '123456')),
        ],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/PermissionsUpdate'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsUpdate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function update(Request $request, string $id) {
        try {
            if (!$id) {
                throw new ModelNotFoundException('Permission not found');
            }
            $valid = Validator::make($request->all(), [
                'name'        => 'sometimes|string|max:255',
                'description' => 'nullable|string|max:255',
            ]);
            if ($valid->fails()) {
                throw new ValidationException($valid);
            }
            $data = $request->all();
            $permission = $this->permissionService->updatePermission($id, $data);
            return PermissionsSearch::make($permission);
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
        path: '/api/v1/admin/permissions/{id}',
        summary: 'Delete permission',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'Permission id', required: true, schema: new OA\Schema(type: 'string', example: '123456')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/PermissionsDelete'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500'),
        ]
    )]
    public function destroy(string $id) {
        try {
            $this->permissionService->deletePermission($id);
            return new PermissionsDelete(null);
        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException($e->getMessage());
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

}
