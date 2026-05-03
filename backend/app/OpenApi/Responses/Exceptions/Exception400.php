<?php
namespace App\OpenApi\Responses\Exceptions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "Exception400",
    description: "Bad Request",
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Exception'),
        ]
    )
)]
final class Exception400 {
}
