<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(schema: 'Roles', required: ['role_name'])]
final class RoleSchema {
    #[OA\Property(property: 'id', type: 'integer', example: '1')]
    #[OA\Property(property: 'name', type: 'string', example: 'admin', uniqueItems: true)]
    #[OA\Property(property: 'description', type: 'string', example: 'web' )]
    #[OA\Property(property: 'created_at', type: 'string', example: '2023-01-01 00:00:00')]
    #[OA\Property(property: 'updated_at', type: 'string', example: '2023-01-01 00:00:00')]
    #[OA\Property(property: 'permissions', type: 'array', items: new OA\Items(type: 'object'), example: [])]
    public array $dummy = [];
}
