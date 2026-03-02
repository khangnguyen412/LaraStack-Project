<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException as AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException as AuthorizationException;
use Illuminate\Validation\ValidationException as ValidationException;
use Illuminate\Session\TokenMismatchException as TokenMismatchException;
use Illuminate\Database\Eloquent\ModelNotFoundException as ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException as NotFoundHttpException;

use App\Http\Response\ErrorResponse;

class Handler extends ExceptionHandler
{
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
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {});
    }

    public function render($request, Throwable $e)
    {
        // Bad Request (400)
        if ($e instanceof ValidationException) {
            return ErrorResponse::getErrorResponse(400, "VALIDATION_ERROR", $e->getMessage());
        }

        // Authentication (401)
        if ($e instanceof AuthenticationException) {
            return ErrorResponse::getErrorResponse(401, "UNAUTHORIZED", $e->getMessage());
        }

        // Authorization (403)
        if ($e instanceof AuthorizationException) {
            return ErrorResponse::getErrorResponse(403, "FORBIDDEN", "You do not have permission to access this resource.");
        }

        // Model Not Found (404)
        if ($e instanceof ModelNotFoundException) {
            return ErrorResponse::getErrorResponse(404, "NOT_FOUND", $e->getMessage());
        }

        // Not Found (404)
        if ($e instanceof NotFoundHttpException) {
            return ErrorResponse::getErrorResponse(404, "NOT_FOUND", $e->getMessage());
        }

        // Validation (422)
        if ($e instanceof ValidationException) {
            return ErrorResponse::getErrorResponse(422, "VALIDATION_ERROR", $e->getMessage());
        }

        // CSRF Token Mismatch (419)
        if ($e instanceof TokenMismatchException) {
            return ErrorResponse::getErrorResponse(419, "TOKEN_MISMATCH", $e->getMessage());
        }

        // Default (500)
    }
}
