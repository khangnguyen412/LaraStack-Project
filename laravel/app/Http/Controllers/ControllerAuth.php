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

use App\Http\Requests\AuthRequest;
use App\Http\Response\ApiResponse;

use App\Models\ModelsPermissions;
use App\Models\ModelsUsers;
use App\Services\AuthService;
use App\Services\UserService;


#[OA\Tag(name: 'Auth', description: 'Operations about authentication')]
class ControllerAuth extends Controller {
    protected $authService;
    protected $userService;

    public function __construct(AuthService $authService, UserService $userService) {
        $this->authService = $authService;
        $this->userService = $userService;
    }

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

            $result = $this->authService->login($credentials, $credentials['email'] ?? null, $credentials['user_name'] ?? null);

            /**
             * Set cookie()
             * @param string|null $name - Name of cookie
             * @param string|null $value - Value of cookie
             * @param int $minutes - Time to live of cookie (minute)
             * @param string|null $path - Path of cookie
             * @param string|null $domain - Domain of cookie
             * @param bool|null $secure - Set true if using https
             * @param bool $httpOnly - Set true if block JavaScript access
             * @param bool $raw - Set true if raw cookie
             * @param string|null $samesite - Sameamesite of cookie
             */
            $cookie = cookie("jwt", $result['token'], config('jwt.ttl'), '/', null, false, true, false, 'Lax');
            return response()->json([
                "status"  => 200,
                "profile" => $result['profile'],
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
            $this->authService->logout();
            return response()->json([
                "status"  => 200,
                "message" => "Logout Successfully"
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)->withoutCookie('jwt'); // Remove cookie from browser
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
            $uid = $request->user()->uuid;
            $profile = $this->userService->profile($uid);
            return response()->json([
                "status"  => 200,
                "profile" => $profile,
            ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }
}