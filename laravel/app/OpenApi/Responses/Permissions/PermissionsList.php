<?php
namespace App\OpenApi\Responses\Permissions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "GetPermissionsList",
    description: 'OK',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(property: 'permissions_list', type: 'array', items: new OA\Items(ref: '#/components/schemas/Permissions'))
        ]
    )
)]
final class PermissionsList {
}