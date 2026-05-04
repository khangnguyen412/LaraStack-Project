<?php
namespace App\OpenApi\Responses\Permissions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "PermissionsGetById",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Permissions')
        ]
    )
)]
final class PermissionsGetById {
}