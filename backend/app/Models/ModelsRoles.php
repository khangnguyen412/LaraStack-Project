<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelsRoles extends Model {
    use HasFactory;
    protected $table = "roles";
    protected $primaryKey = "id";
    protected $fillable = [
        "name",
        "description",
        "created_at",
        "updated_at",
    ];
    protected $hidden = [];

    public function users() {
        return $this->hasMany(ModelsUsers::class, "role_id", "id");
    }

    public function permissions() {
        return $this->belongsToMany(ModelsPermissions::class, "roles_has_permissions", "role_id", "permission_id");
    }
}
