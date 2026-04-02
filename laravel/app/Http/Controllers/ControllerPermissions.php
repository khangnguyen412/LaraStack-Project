<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Http\Request;

use OpenApi\Attributes as OA;

use App\Http\Response\ApiResponse;

use App\Repositories\PermissionsRepository;

#[OA\Tag(name: 'Permissions', description: 'Permission management')]
class ControllerPermissions extends Controller {
    protected $permissionsRepository;

    public function __construct(PermissionsRepository $permissionsRepository) {
        $this->permissionsRepository = $permissionsRepository;
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
            new OA\Parameter(
                name: 'perPage',
                in: 'query',
                description: 'Number of items per page',
                required: false,
                schema: new OA\Schema(type: 'integer', example: 10)
            ),
            new OA\Parameter(
                name: 'currentPage',
                in: 'query',
                description: 'Current page number',
                required: false,
                schema: new OA\Schema(type: 'integer', example: 1)
            ),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetPermissionsList'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
        ]
    )]
    public function index(Request $request) {
        try {
            $permissions = $this->permissionsRepository->pagination($request->input('perPage', 10), ['*'], 'page', $request->input('currentPage', 1));
            return ApiResponse::sendResponse([
                'permissions_list' => $permissions->items(),
                'current_page'     => $permissions->currentPage(),
                'per_page'         => $permissions->perPage(),
                'total'            => $permissions->total(),
            ], 200);
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
