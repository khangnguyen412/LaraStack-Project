<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

/**
 * Queue
 */
use App\Notifications\ResetPasswordQueued;

/**
 * JWT
 */
use Tymon\JWTAuth\Contracts\JWTSubject;

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

    public function roles() {
        return $this->belongsTo(ModelsRoles::class, "role_id", "id");
    }

    /**
     * Accessor for permissions attribute.
     * 
     * @return array
     */
    public function getPermissionsAttribute() {
        return $this->roles()->with('permissions')->get()->pluck('permissions')->flatten()->pluck('name')->unique()->values()->toArray();
    }

    /**
     * Summary of getJWTIdentifier
     * 
     * @return string
     */
    public function getJWTIdentifier() {
        return $this->uuid;
    }

    /**
     * Summary of getJWTCustomClaims
     * 
     * @return array
     */
    public function getJWTCustomClaims() {
        return [
            'role_id'     => $this->roles()->pluck("id")->first(),
            'permissions' => $this->getPermissionsAttribute(),
        ];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token) {
        $this->notify(new ResetPasswordQueued());
    }

}
