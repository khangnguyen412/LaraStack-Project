<?php
namespace App\OpenApi\Responses\Auths;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'AuthsForgotPassword',
    description: 'OK',
    content: new OA\JsonContent(
        type: 'object',
        properties: [
            new OA\Property(property: 'data', type: 'object', properties: [
                new OA\Property(property: 'message', type: 'string', example: 'We have e-mailed your password reset link!'),
            ]),
        ]
    )
)]
final class AuthsForgotPassword {
}
