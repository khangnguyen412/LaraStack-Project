<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use OpenApi\Attributes as OA;


use App\Models\ModelsUsers;
use App\Http\Response\ApiResponse;

#[OA\Tag(name: 'Users', description: 'User management')]
class ControllerUsers extends Auth {

    /**
     *  Get User
     */
    #[OA\Get(
        path: '/api/v1/admin/user',
        summary: 'Get user list',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetUsersList'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function index() {
        try {
            $users_list = ModelsUsers::with('roles')->get();
            return ApiResponse::sendResponse(["users_list" => $users_list], 200);
        } catch (NotFoundHttpException $e) {
            throw new NotFoundHttpException($e->getMessage());
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
    #[OA\Get(
        path: '/api/v1/admin/user/{id}',
        summary: 'Get user by id',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetUserById'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
        ]
    )]
    public function show(string $id) {
        if (!$id) {
            throw new NotFoundHttpException("Couldn't get userid");
        }
        $users_with_id = ModelsUsers::with('roles')->find($id);
        if (!$users_with_id) {
            throw new NotFoundHttpException("Couldn't get user with id: $id");
        }
        return ApiResponse::sendResponse(["data" => $users_with_id], 200);
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
