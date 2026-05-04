<?php
namespace App\OpenApi\Requests\Permissions;

use OpenApi\Attributes as OA;

#[OA\RequestBody(
    request: 'PermissionsUpdate',
    required: true,
    description: 'Update permission',
    content: new OA\JsonContent(
        type: 'object',
        required: ['name', 'display_name'],
        properties: [
            new OA\Property(property: 'name', type: 'string', example: 'CREATE_PERMISSION'),
            new OA\Property(property: 'description', type: 'string', example: 'Create Permission'),
        ]
    )
)]
final class PermissionsUpdate {
}