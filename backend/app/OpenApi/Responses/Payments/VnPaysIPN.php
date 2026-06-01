<?php
namespace App\OpenApi\Responses\Payments;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'VnPaysIPN',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(
                property: 'data',
                type: 'object',
                properties: [
                    new OA\Property(property: 'code', type: 'string', example: '00'),
                    new OA\Property(property: 'message', type: 'string', example: 'Success'),
                ]
            ),
        ]
    )
)]
final class VnPaysIPN {
}
