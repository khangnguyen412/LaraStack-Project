<?php
namespace App\OpenApi\Responses\Roles;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "RolesUpdate",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Roles'),
        ]
    )
)]
final class RolesUpdate {
}