<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(schema: 'Users')]
final class UserSchema {
    #[OA\Property(property: 'id', type: 'string', format: 'uuid', example: '5d1e8b2a-0a2b-4c0e-9a1b-f6b9a56a9a11')]
    #[OA\Property(property: 'user_name', type: 'string', example: 'jdoe')]
    #[OA\Property(property: 'display_name', type: 'string', example: 'John Doe')]
    #[OA\Property(property: 'email', type: 'string', format: 'email', example: 'john@example.com')]
    #[OA\Property(property: 'email_verified_at', type: 'string', format: 'date-time', example: '2023-01-01T12:00:00Z', nullable: true)]
    #[OA\Property(property: 'password', type: 'string', writeOnly: true, example: 'password123')]
    #[OA\Property(property: 'address', type: 'string', example: '123 Main St')]
    #[OA\Property(property: 'phone', type: 'string', example: '1234567890')]
    #[OA\Property(property: 'bio', type: 'string', example: 'A passionate developer', nullable: true)]
    #[OA\Property(property: 'avatar', type: 'string', example: 'avatar.jpg', nullable: true)]
    #[OA\Property(property: 'deleted_at', type: 'string', format: 'date-time', nullable: true)]
    #[OA\Property(property: 'created_at', type: 'string', format: 'date-time', nullable: true)]
    #[OA\Property(property: 'updated_at', type: 'string', format: 'date-time', nullable: true)]
    #[OA\Property(property: 'role_id', type: 'string', example: '1')]
    #[OA\Property(property: 'role', type: 'object', ref: '#/components/schemas/Roles')]
    #[OA\Property(property: 'permissions', type: 'array', items: new OA\Items(type: 'string'))]
    public array $dummy = [];
}
