<?php

namespace App\Http\Resources\Roles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Permissions\PermissionsSearch;

class RolesSearch extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id'          => $this["id"],
            'name'        => $this["name"],
            'description' => $this["description"],
            'created_at'  => $this["created_at"],
            'updated_at'  => $this["updated_at"],
            'user_count'  => $this["userCount"],
            'permissions' => PermissionsSearch::collection($this->whenLoaded('permissions')),
        ];
    }

}
