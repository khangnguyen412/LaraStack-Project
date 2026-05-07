<?php

namespace App\Http\Resources\Permissions;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RolesCreate extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [];
    }

    /**
     * Customize the response for this resource.
     */
    public function toResponse($request) {
        return response()->json(['data' => 'success'], 201);
    }
}
