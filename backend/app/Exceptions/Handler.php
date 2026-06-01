<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException as AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException as AuthorizationException;
use Illuminate\Validation\ValidationException as ValidationException;
use Illuminate\Session\TokenMismatchException as TokenMismatchException;
use Illuminate\Database\Eloquent\ModelNotFoundException as ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException as NotFoundHttpException;

use App\Http\Resources\ErrorsResource;

class Handler extends ExceptionHandler {
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void {
        $this->reportable(function (Throwable $e) {
            \Log::channel('discord')->error($e->getMessage());
        })->stop();
    }

    public function render($request, Throwable $e) {
        // Bad Request (400)
        if ($e instanceof BadRequestHttpException) {
            return ErrorsResource::make([
                'code'    => '400',
                'message' => 'BAD_REQUEST',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(400);
        }

        // Authentication (401)
        if ($e instanceof AuthenticationException) {
            return ErrorsResource::make([
                'code'    => '401',
                'message' => 'UNAUTHORIZED',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(401);
        }

        // Authorization (403)
        if ($e instanceof AuthorizationException) {
            return ErrorsResource::make([
                'code'    => '403',
                'message' => 'FORBIDDEN',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(403);
        }

        // Model Not Found (404)
        if ($e instanceof ModelNotFoundException) {
            return ErrorsResource::make([
                'code'    => '404',
                'message' => 'NOT_FOUND',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(404);
        }

        // Not Found (404)
        if ($e instanceof NotFoundHttpException) {
            return ErrorsResource::make([
                'code'    => '404',
                'message' => 'NOT_FOUND',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(404);
        }

        // CSRF Token Mismatch (419)
        if ($e instanceof TokenMismatchException) {
            return ErrorsResource::make([
                'code'    => '419',
                'message' => 'TOKEN_MISMATCH',
                'data'    => $e->getMessage(),
            ])->response()->setStatusCode(419);
        }

        // Validation (422)
        if ($e instanceof ValidationException) {
            return ErrorsResource::make([
                'code'    => '422',
                'message' => 'VALIDATION_ERROR',
                'data'    => $e->errors(),
            ])->response()->setStatusCode(422);
        }

        // Default (500)
        return ErrorsResource::make([
            'code'    => '500',
            'message' => 'SERVER_ERROR',
            'data'    => $e->getMessage(),
        ])->response()->setStatusCode(500);
    }

}
