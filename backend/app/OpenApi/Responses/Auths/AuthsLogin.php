<?php
namespace App\OpenApi\Responses\Auths;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'AuthsLogin',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', ref: '#/components/schemas/Users'),
        ]
    )
)]
final class AuthsLogin {
}
