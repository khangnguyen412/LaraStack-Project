<?php
namespace App\OpenApi\Responses\Auths;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'AuthsLogout',
    description: 'OK',
)]
final class AuthsLogout {
}
