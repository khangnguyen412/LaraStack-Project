<?php
namespace App\OpenApi\Requests\Auths;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'AuthsResetPassword',
    required: true,
    description: 'User reset password credentials, email is required',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'email', type: 'string', example: 'admin@example.com'),
            new OA\Property(property: 'password', type: 'string', example: '123456'),
            new OA\Property(property: 'password_confirmation', type: 'string', example: '123456'),
            new OA\Property(property: 'token', type: 'string', example: '123456'),
        ]
    )
)]
final class AuthsResetPassword {
}
