<?php

namespace App\Http\Resources\Auths;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthsLogout extends JsonResource {
    protected $cookie;

    public function __construct($cookie) {
        parent::__construct([]);
        $this->cookie = $cookie;
    }

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
        return response()->noContent(203)->withCookie($this->cookie);
    }

}
