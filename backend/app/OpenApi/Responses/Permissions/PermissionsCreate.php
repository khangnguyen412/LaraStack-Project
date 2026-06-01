<?php
namespace App\OpenApi\Responses\Permissions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "PermissionsCreate",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', properties: [
                new OA\Property(property: 'message', type: 'string', example: 'success'),
            ]),
        ]
    )
)]
final class PermissionsCreate {
}