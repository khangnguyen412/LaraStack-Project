<?php
namespace App\OpenApi\Responses\Permissions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "PermissionsUpdate",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Permissions'),
        ]
    )
)]
final class PermissionsUpdate {
}