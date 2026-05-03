<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeederPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $arr = [
            [
                'name'              => "CREATE_USER",
                'description'        => "create user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_USER",
                'description'        => "read user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_USER",
                'description'        => "update user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_USER",
                'description'        => "delete user",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "CREATE_ROLE",
                'description'        => "create role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_ROLE",
                'description'        => "read role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_ROLE",
                'description'        => "update role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_ROLE",
                'description'        => "delete role",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "CREATE_PERMISSION",
                'description'        => "create permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "READ_PERMISSION",
                'description'        => "read permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "UPDATE_PERMISSION",
                'description'        => "update permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => "DELETE_PERMISSION",
                'description'        => "delete permission",
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ];
        DB::table('permissions')->insert($arr);
    }
}
