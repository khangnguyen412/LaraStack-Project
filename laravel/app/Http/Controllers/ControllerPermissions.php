<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Http\Request;

use OpenApi\Attributes as OA;

use App\Http\Response\ApiResponse;

use App\Models\ModelsPermissions;

#[OA\Tag(name: 'Permissions', description: 'Permission management')]
class ControllerPermissions extends Controller {
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/permissions',
        summary: 'Get permission list',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetPermissionsList'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
        ]
    )]
    public function index() {
        try {
            $permissions = ModelsPermissions::all();
            return ApiResponse::sendResponse(["permissions_list" => $permissions], 200);
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
