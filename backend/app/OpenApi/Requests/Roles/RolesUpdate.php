<?php
namespace App\OpenApi\Requests\Roles;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'RolesUpdate',
    required: true,
    description: 'Update role',
    content: new OA\JsonContent(
        type: 'object',
        required: ['name', 'description'],
        properties: [
            new OA\Property(property: 'name', type: 'string', example: 'admin'),
            new OA\Property(property: 'description', type: 'string', example: 'Admin role'),
            new OA\Property(property: 'permissions', type: 'array', items: new OA\Items(type: 'integer'), example: [1, 2, 3]),
        ]
    )
)]
final class RolesUpdate {
}