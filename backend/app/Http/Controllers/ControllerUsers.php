<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

/**
 * Exception
 */
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Models
 */
use App\Models\ModelsUsers;

/**
 * Services
 */
use App\Services\UserService;

/**
 * Resource
 */
use App\Http\Resources\UsersResource;

#[OA\Tag(name: 'Users', description: 'User management')]
class ControllerUsers extends Auth {
    protected UserService $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }


    /**
     *  Get User
     */
    #[OA\Get(
        path: '/api/v1/admin/users',
        summary: 'Get user list',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersSearch'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function index() {
        try {
            $users_list = ModelsUsers::with('roles')->get();
            $collection = $users_list->map(fn($user) => new UsersResource($user, withPermissions: false));
            return UsersResource::collection($collection);
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
    #[OA\Post(
        path: '/api/v1/admin/users',
        summary: 'Create user',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/UsersCreate'),
        responses: [
            new OA\Response(response: 201, ref: '#/components/responses/UsersCreate'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
        ]
    )]
    public function store(Request $request) {
        $validated = $request->validate([
            'user_name'     => 'required|string|unique:users,user_name',
            'display_name'  => 'required|string',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|min:6',
            'address'       => 'nullable|string',
            'phone'         => 'nullable|string',
            'bio'           => 'nullable|string',
            'role_id'       => 'required|exists:roles,id',
        ]);
        try {
        } catch (Exception $e) {
            throw new Exception('Không thể tạo user, rollback!');
        }
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/users/{id}',
        summary: 'Get user by id',
        security: [['bearerAuth' => []]],
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'id', in: 'path', description: 'User ID', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UsersGetById'),
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
        return new UsersResource($users_with_id);
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
