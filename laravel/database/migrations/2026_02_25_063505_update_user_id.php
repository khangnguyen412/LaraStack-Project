<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        /**
         * Drop foreign key constraint on user_id
         */
        foreach (['posts', 'pages', 'products'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropForeign(['user_id']);
            });
        }

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

        /**
         * Change id to uuid in users table
         */
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id');
        });

        /**
         * Update uuid for existing users
         */
        DB::table('users')->get()->each(function ($user) {
            DB::table('users')->where('id', $user->id)->update(['uuid' => (string) Str::uuid()]);
        });

        /**
         * Change id to uuid in users table
         */
        DB::statement('ALTER TABLE `users` MODIFY `id` INT NOT NULL');
        Schema::table('users', function (Blueprint $table) {
            // $table->unsignedBigInteger('id')->change();
            $table->dropPrimary();
            $table->dropColumn('id');
            $table->uuid('uuid')->nullable(false)->change();
            $table->primary('uuid');
        });

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        /**
         * Add foreign key constraint on user_id
         */
        foreach (['posts', 'pages', 'products'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->uuid('user_id')->change();
                $table->foreign('user_id')->references('uuid')->on('users')->onDelete('cascade')->onUpdate('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        /**
         * Drop foreign key constraint on user_id
         */
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

        /**
         * Change uuid to id in users table
         */
        Schema::table('users', function (Blueprint $table) {
            $table->bigIncrements('id')->first();
        });

        /**
         * Drop primary uuid
         */
        Schema::table('users', function (Blueprint $table) {
            $table->dropPrimary();
        });

        /**
         * Drop uuid column
         */
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('uuid');
        });

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        /**
         * Add foreign key constraint on user_id
         */
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
        Schema::table('pages', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }
};