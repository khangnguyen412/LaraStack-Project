<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use OpenApi\Attributes as OA;


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
                return response()->json([
                    "status" => 401,
                    "error"  => "Invalid email or password"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $credentials = $request->only("password");
            if ($request->filled("username")) {
                $credentials["user_name"] = $request->username;
            } else {
                $credentials["email"] = $request->email;
            }

            $user = ModelsUsers::where("email", $request->email)->orWhere("user_name", $request->username)->first();
            if (!$user) {
                return response()->json([
                    "status" => 401,
                    "error"  => "Username not found"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    "status" => 401,
                    "error"  => "Invalid password"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $token = auth()->attempt($credentials);
            \Log::info($token);
            if (!$token) {
                // throw new AuthenticationException("Invalid credentials");
                return response()->json([
                    "status" => 401,
                    "error"  => "Invalid credentials"
                ], 401, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }

            $profile = ModelsUsers::with("role")->find(auth()->user()->uuid);
            $cookie = cookie(
                "jwt",
                $token,
                config('jwt.ttl'),  // Thời gian sống (phút)
                '/',                // Path
                null,               // Domain
                false,              // Secure (Bật true nếu dùng https)
                true,               // HttpOnly (QUAN TRỌNG: Chặn JavaScript truy cập)
                false,              // Raw
                'Lax'               // SameSite
            );
            return response()->json([
                "status"  => 200,
                "token"   => $token,
                "profile" => $profile,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)->withCookie($cookie);
        } catch (Exception $e) {
            return response()->json([
                "status" => 403,
                "error"  => "Error: " . $e->getMessage(),
                "req"    => $request,
            ], 403, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
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
            // Lấy token từ cookie thủ công nếu middleware không tự nhận
            $token = $request->cookie('jwt');

            if ($token) {
                // Set token vào hệ thống auth để thực hiện logout/invalidate
                JWTAuth::setToken($token)->invalidate();
            }
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
            $profile = ModelsUsers::with("role")->find($request->user()->uuid); // Call user() form setUserResolver in middleware AuthMiddleware
            return response()->json([
                "status"  => 200,
                "profile" => $profile
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }
}