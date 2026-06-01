<?php
namespace App\OpenApi\Requests\Auths;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'AuthsForgotPassword',
    required: true,
    description: 'User forgot password credentials, email is required',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'email', type: 'string', example: 'admin@example.com'),
        ]
    )
)]
final class AuthsForgotPassword {
}
