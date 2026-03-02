<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;
use OpenApi\Attributes as OA;
use Carbon\Carbon;

class ModelsUsers extends Authenticatable implements JWTSubject {
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    protected $table = "users";
    protected $primaryKey = "uuid";
    protected $keyType = 'string';
    protected $fillable = [
        "user_name",
        "display_name",
        "email",
        "email_verified_at",
        "password",
        "address",
        "phone",
        "image",
        "role_id",
    ];
    protected $hidden = [
        'password',
        'remember_token',
        'api_token'
    ];
    public $timestamps = true;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'created_at'        => 'datetime:Y-m-d H:i:s',
            'updated_at'        => 'datetime:Y-m-d H:i:s',
        ];
    }

    public function getCreatedAtAttribute($value) {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getUpdatedAtAttribute($value) {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function roles() {
        return $this->belongsTo(ModelsRoles::class, "role_id", "id");
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [
            'role_id'     => $this->role_id,
            'permissions' => $this->roles?->permissions ? $this->roles->permissions->pluck('name')->filter()->values()->toArray() : [],
        ];
    }
}
