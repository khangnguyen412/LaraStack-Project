<?php
namespace App\OpenApi\Responses\Auths;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'AuthsMe',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Users'),
        ]
    )
)]
final class AuthsMe {
}
