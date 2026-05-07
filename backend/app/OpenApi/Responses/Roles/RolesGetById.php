<?php
namespace App\OpenApi\Responses\Roles;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "RolesGetById",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Roles')
        ]
    )
)]
final class RolesGetById {
}