<?php
namespace App\OpenApi\Schemas;

use OpenApi\Attributes as OA;

#[OA\Schema(schema: 'Roles', required: ['role_name'])]
final class RoleSchema {
    #[OA\Property(property: 'id', type: 'integer', example: '1')]
    #[OA\Property(property: 'name', type: 'string', example: 'admin', uniqueItems: true)]
    #[OA\Property(property: 'description', type: 'string', example: 'web' )]
    public array $dummy = [];
}
