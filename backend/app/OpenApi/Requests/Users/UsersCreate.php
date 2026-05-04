<?php
namespace App\OpenApi\Requests\Users;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'UsersCreate',
    required: true,
    description: 'User login credentials, email or username is required',
    content: new OA\JsonContent(
        type: 'object',
        required: ['user_name', 'display_name', 'email', 'password'],
        properties: [
            new OA\Property(property: 'user_name', type: 'string', example: 'admin'),
            new OA\Property(property: 'display_name', type: 'string', example: 'Admin'),
            new OA\Property(property: 'email', type: 'string', example: 'example@example.com'),
            new OA\Property(property: 'password', type: 'string', example: '123456'),
            new OA\Property(property: 'address', type: 'string', example: '123 Main St'),
            new OA\Property(property: 'phone', type: 'string', example: '0987654321'),
            new OA\Property(property: 'role_id', type: 'integer', example: '1'),
        ]
    )
)]
final class UsersCreate {
}
