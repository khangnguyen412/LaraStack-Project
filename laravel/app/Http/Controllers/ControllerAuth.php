<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Tymon\JWTAuth\Facades\JWTAuth;

use OpenApi\Attributes as OA;

use App\Models\ModelsPermissions;
use App\Models\ModelsUsers;
use App\Http\Requests\AuthRequest;
use App\Http\Response\ApiResponse;

#[OA\Tag(name: 'Auth', description: 'Operations about authentication')]
class ControllerAuth extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    #[OA\Post(
        path: '/api/v1/admin/login',
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Login user',
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/UserLogin'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UserLogin'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function login(Request $request) {
        try {
            $valid = Validator::make($request->all(), [
                "email"    => "nullable|email",
                "username" => "nullable|string",
                "password" => "required"
            ]);
            if ($valid->fails() || (empty($request->email) && empty($request->username))) {
                throw new ValidationException("Invalid email or password");
            }

            $credentials = $request->only("password");
            if ($request->filled("username")) {
                $credentials["user_name"] = $request->username;
            } else {
                $credentials["email"] = $request->email;
            }

            $user = ModelsUsers::where("email", $request->email)->orWhere("user_name", $request->username)->first();
            if (!$user) {
                throw new AuthenticationException("Username not found");
            }

            if (!Hash::check($request->password, $user->password)) {
                throw new AuthenticationException("Invalid password");
            }

            $token = auth()->attempt($credentials);
            if (!$token) {
                throw new AuthenticationException("Invalid credentials");
            }

            $profile = ModelsUsers::with("roles")->find(auth()->user()->uuid);
            /**
             * Cookie (jwt, Expires, Path - Thời gian sống (phút), Domain, Secure (Bật true nếu dùng https), HttpOnly (QUAN TRỌNG: Chặn JavaScript truy cập), Raw, Samesite)
             */
            $cookie = cookie("jwt", $token, config('jwt.ttl'), '/', null, false, true, false, 'Lax');
            return response()->json([
                "status"  => 200,
                "profile" => $profile,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)->withCookie($cookie);
        } catch (AuthenticationException $e) {
            throw new AuthenticationException($e->getMessage());
        } catch (AuthorizationException $e) {
            throw new AuthorizationException($e->getMessage());
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Logout user.
     */
    #[OA\Post(
        path: '/api/v1/admin/logout',
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Logout user',
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/UserLogout'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function logout(Request $request) {
        try {
            auth('api')->logout();
            return response()->json([
                "status"  => 200,
                "message" => "Logout Successfully"
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)->withoutCookie('jwt'); // Xóa cookie khỏi trình duyệt;
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/profile',
        tags: ['Auth'],
        summary: 'Get user profile',
        description: 'Get user profile',
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/GetUserProfile'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function profile(Request $request) {
        try {
            $profile = ModelsUsers::with("roles")->find($request->user()->uuid);
            return response()->json([
                "status"  => 200,
                "profile" => $profile,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }
}