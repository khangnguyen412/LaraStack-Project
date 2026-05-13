<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeederUser extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $arr = [
            [
                'uuid'                => Str::uuid()->toString(),
                'user_name'         => "admin",
                'display_name'      => "Admin CMS",
                'email'             => "admin@example.com",
                'email_verified_at' => now(),
                'password'          => bcrypt('admin123'),
                'address'           => "Lạc Long Quân",
                'phone'             => "000000000",
                'bio'               => "Learn, Keep Learning, Learn Forever",
                'avatar'            => "",
                'role_id'           => 1,
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'uuid'                => Str::uuid()->toString(),
                'user_name'         => "khangnguyen",
                'display_name'      => "Khang Nguyễn",
                'email'             => "phuonghoanglun@gmail.com",
                'email_verified_at' => now(),
                'password'          => bcrypt('khang123'),
                'address'           => "Lạc Long Quân",
                'phone'             => "0973626954",
                'bio'               => "Learn, Keep Learning, Learn Forever",
                'avatar'            => "",
                'role_id'           => 1,
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ];
        DB::table('users')->insert($arr);
    }
}
