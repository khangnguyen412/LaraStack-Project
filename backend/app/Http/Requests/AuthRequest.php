<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "email"    => "nullable|email",
            "username" => "nullable|string",
            "password" => "required"
        ];
    }
    public function messages(): array
    {
        return [
            "email.email"       => "Email is not valid",
            "password.required" => "Password is required",
        ];
    }
    protected function prepareForValidation(): void
    {
        $this->merge([]);
    }
    protected function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if (!$this->hasAny('email', 'username')) {
                throw new ValidationException($validator, null, "Invalid email or username");
            }
        });
    }
}
