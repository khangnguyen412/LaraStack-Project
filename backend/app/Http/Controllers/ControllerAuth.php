<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Password;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Swagger
 */
use OpenApi\Attributes as OA;

/**
 * Service
 */
use App\Services\Interface\AuthServiceInterface;
use App\Services\UserService;

/**
 * Resource
 */
use App\Http\Resources\Auths\AuthsLogout;
use App\Http\Resources\Auths\AuthsForgotPassword;
use App\Http\Resources\Auths\AuthsResetPassword;
use App\Http\Resources\UsersResource;



#[OA\Tag(name: 'Auth', description: 'Operations about authentication')]
class ControllerAuth extends Controller {
    protected $authService;
    protected $userService;

    public function __construct(AuthServiceInterface $authService, UserService $userService) {
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
        path: '/api/v1/login',
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Login user',
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/AuthsLogin'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/AuthsLogin'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function login(Request $request) {
        $valid = Validator::make($request->all(), [
            "email"    => "nullable|email",
            "username" => "nullable|string",
            "password" => "required"
        ]);
        if ($valid->fails() || (empty($request->email) && empty($request->username))) {
            throw ValidationException::withMessages(['email' => ['email' => 'Invalid email or password']]);
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
         * @param string|null name - Name of cookie
         * @param string|null value - Value of cookie
         * @param int minutes - Time to live of cookie (minute)
         * @param string|null path - Path of cookie
         * @param string|null domain - Domain of cookie
         * @param bool|null secure - Set true if using https
         * @param bool httpOnly - Set true if block JavaScript access
         * @param bool raw - Set true if raw cookie
         * @param string|null samesite - Sameamesite of cookie
         */
        $cookie = cookie("jwt", $result['token'], config('jwt.ttl'), '/', null, false, true, false, 'Lax');
        return (new UsersResource($result['profile'], true))->response()->withCookie($cookie);
    }

    /**
     * Logout user.
     */
    #[OA\Post(
        path: '/api/v1/logout',
        tags: ['Auth'],
        summary: 'Logout user',
        description: 'Logout user',
        responses: [
            new OA\Response(response: 203, ref: '#/components/responses/AuthsLogout'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function logout(Request $request) {
        try {
            $this->authService->logout();
            $domain = $request->getHost();
            $secure = $request->secure();
            $sameSite = 'Lax';
            $cookie = Cookie::make('jwt', '', -1, '/', $domain, $secure, true, false, $sameSite);
            return new AuthsLogout($cookie);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/me',
        tags: ['Auth'],
        summary: 'Get current user',
        description: 'Get current user',
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/AuthsMe'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function currentUser(Request $request) {
        try {
            $uid = $request->user()->uuid;
            $currentUser = $this->userService->current($uid);
            return new UsersResource($currentUser, true);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }
    }

    /**
     * Send reset password link to user.
     */
    #[OA\Post(
        path: '/api/v1/password/forgot',
        tags: ['Auth'],
        summary: 'Send reset password link to user',
        description: 'Send reset password link to user',
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/AuthsForgotPassword'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/AuthsForgotPassword'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500')
        ]
    )]
    public function forgotPassword(Request $request) {
        $valid = Validator::make($request->all(), ["email" => "required|email"]);
        if ($valid->fails()) {
            throw ValidationException::withMessages(['email' => ['email' => 'Invalid email']]);
        }

        $user = $this->userService->searchByEmail($request->input('email'));
        if (!$user) {
            throw new AuthenticationException('User not found');
        }

        $this->authService->forgotPassword($request->input('email'));
        return AuthsForgotPassword::make(['message' => 'We have e-mailed your password reset link!']);
    }

    /**
     * Reset password.
     */
    #[OA\Post(
        path: '/api/v1/password/reset',
        tags: ['Auth'],
        summary: 'Reset password',
        description: 'Reset password',
        requestBody: new OA\RequestBody(ref: '#/components/requestBodies/AuthsResetPassword'),
        responses: [
            new OA\Response(response: 200, ref: '#/components/responses/AuthsResetPassword'),
            new OA\Response(response: 400, ref: '#/components/responses/Exception400'),
            new OA\Response(response: 401, ref: '#/components/responses/Exception401'),
            new OA\Response(response: 404, ref: '#/components/responses/Exception404'),
            new OA\Response(response: 500, ref: '#/components/responses/Exception500')
        ]
    )]
    public function resetPassword(Request $request) {
        $valid = Validator::make($request->all(), [
            "email"                 => "required|email",
            "password"              => "required|min:8|confirmed",
            "password_confirmation" => "required|same:password",
            "token"                 => "required|string",
        ]);
        if ($valid->fails()) {
            throw ValidationException::withMessages(['password' => ['required' => 'Password is required']]);
        }

        $status = $this->authService->resetPassword($request->input('token'), $request->input('email'), $request->input('password'));

        return match ($status) {
            Password::INVALID_TOKEN  => throw new AuthenticationException('Invalid token'),
            Password::INVALID_USER   => throw new BadRequestHttpException('Invalid user'),
            Password::PASSWORD_RESET => AuthsResetPassword::make(['message' => 'Password reset successfully']),
            default                  => throw new Exception('Unknown error'),
        };
    }

}