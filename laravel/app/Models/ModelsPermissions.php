<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelsPermissions extends Model {
    use HasFactory;
    protected $table = 'permissions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'guard_name',
    ];

    protected function casts(): array {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
        ];
    }

    public function roles(){
        return $this->belongsToMany(ModelsRoles::class,"roles_has_permissions","permission_id","role_id");
    }
}
