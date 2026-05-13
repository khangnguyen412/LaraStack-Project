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
        ]
    )
)]
final class AuthsResetPassword {
}
