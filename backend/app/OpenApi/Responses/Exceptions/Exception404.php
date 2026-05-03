<?php
namespace App\OpenApi\Responses\Exceptions;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: "Exception404",
    description: "Not Found",
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'object', ref: '#/components/schemas/Exception'),
        ]
    )
)]
final class Exception404 {
}
