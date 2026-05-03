<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DatabaseSeederPermission::class,
            DatabaseSeederRoles::class,
            DatabaseSeederUser::class,
            DatabaseSeederRoleHasPermission::class,
        ]);
    }
}
