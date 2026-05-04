<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'UsersCreate',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'array', items: new OA\Items(ref: '#/components/schemas/Users'))
        ]
    )
)]
final class UsersCreate {
}
