<?php

namespace App\Http\Resources\Permissions;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermissionsUpdate extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "id"          => $this["id"],
            "name"        => $this["name"],
            "description" => $this["description"],
            "created_at"  => $this["created_at"],
            "updated_at"  => $this["updated_at"],
        ];
    }

}
