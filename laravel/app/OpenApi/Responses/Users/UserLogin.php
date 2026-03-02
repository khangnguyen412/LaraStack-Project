<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'UserLogin',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'token', type: 'string', example: 'Bearer token'),
            new OA\Property(property: 'profile', ref: '#/components/schemas/Users'),
            new OA\Property(property: 'permissions', type: 'array', items: new OA\Items(type: 'string')),
        ]
    )
)]
final class UserLogin {
}
