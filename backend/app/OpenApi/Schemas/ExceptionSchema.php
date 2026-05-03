<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'Exception',
    type: 'object',
    required: ['errorCode', 'errorMessage', 'data'],
    properties: [
        new OA\Property(property: 'code', type: 'string', example: 'ERROR_CODE'),
        new OA\Property(property: 'message', type: 'string', example: 'Error message.'),
        new OA\Property(property: 'errors', type: 'array', items: new OA\Items(type: 'object'), example: []),
    ]
)]
final class ExceptionSchema {}