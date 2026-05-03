<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'GetUserById',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(
                property: 'data',
                type: 'object',
                ref: '#/components/schemas/Users'
            )
        ]
    )
)]
final class UserById {
}
