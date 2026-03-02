<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;

use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Models\ModelsUsers;

class CheckPermissionMiddleware {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $permission): Response {
        $payload = JWTAuth::parseToken()->getPayload();

        if (!$payload) {
            throw new AuthenticationException("User not authenticated");
            }
            
        \Log::info($payload->get('permissions'));
        if (!in_array($permission, $payload->get('permissions'))) {
            throw new AuthorizationException("You do not have permission to access");
        }

        return $next($request);
    }
}
