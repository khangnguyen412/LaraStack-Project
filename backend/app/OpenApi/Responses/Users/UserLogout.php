<?php
namespace App\OpenApi\Responses\Users;

use OpenApi\Attributes as OA;

#[OA\Response(
    response: 'UserLogout',
    description: 'OK',
)]
final class UserLogout {
}
