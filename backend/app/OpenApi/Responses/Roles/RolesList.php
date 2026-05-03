<?php
namespace App\OpenApi\Responses\Roles;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "GetRolesList",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'data', type: 'array', items: new OA\Items(ref: '#/components/schemas/Roles'))
        ]
    )
)]
final class RolesList {
}