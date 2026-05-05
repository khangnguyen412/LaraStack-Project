<?php
namespace App\OpenApi\Responses\Permissions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "PermissionsDelete",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'string', example: 'success'),
        ]
    )
)]
final class PermissionsDelete {
}