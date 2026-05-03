<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * Thêm cột uuid vào bảng users
         */
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id');
        });
        /**
         * Điền giá trị uuid cho các bản ghi hiện có và đảm bảo rằng cột uuid không có giá trị null
         * Set lại cột uuid là NOT NULL
         * Đảm bảo rằng mỗi giá trị uuid là duy nhất
         */
        DB::statement("UPDATE users SET uuid = UUID() WHERE uuid IS NULL");
        DB::statement("ALTER TABLE users MODIFY uuid CHAR(36) NOT NULL");
        Schema::table("users", function (Blueprint $table) {
            $table->unique('uuid');
        });

        /**
         * Thêm cột uuid vào bảng posts, pages, products
         * Thêm chỉ mục user_uuid cho bảng posts, pages, products
         */
        foreach (['posts', 'pages', 'products'] as $tbl) {
            Schema::table($tbl, function (Blueprint $table) {
                $table->uuid('user_uuid')->after('user_id')->nullable();
                $table->index('user_uuid');
            });
        }
        /**
         * Điền giá trị uuid cho các bản ghi hiện có trong bảng posts, pages, products
         * Đảm bảo rằng mỗi giá trị uuid là duy nhất
         */
        DB::statement(" UPDATE posts p JOIN users u ON p.user_id = u.id SET p.user_uuid = u.uuid WHERE p.user_uuid IS NULL");
        DB::statement(" UPDATE pages p JOIN users u ON p.user_id = u.id SET p.user_uuid = u.uuid WHERE p.user_uuid IS NULL");
        DB::statement(" UPDATE products p JOIN users u ON p.user_id = u.uuid SET p.user_uuid = u.uuid WHERE p.user_uuid IS NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        foreach (['posts', 'pages', 'products'] as $tbl) {
            Schema::table($tbl, function (Blueprint $table) {
                //
                $table->dropIndex(['user_uuid']);
                $table->dropColumn('user_uuid');
            });
        }
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['uuid']);
            $table->dropColumn('uuid');
        });
    }
};
