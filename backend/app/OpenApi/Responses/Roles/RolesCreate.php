<?php
namespace App\OpenApi\Responses\Roles;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "RolesCreate",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'string', example: 'success'),
        ]
    )
)]
final class RolesCreate {
}