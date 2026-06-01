<?php
namespace App\OpenApi\Responses\Roles;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "RolesDelete",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', properties: [
                new OA\Property(property: 'message', type: 'string', example: 'success'),
            ]),
        ]
    )
)]
final class RolesDelete {
}