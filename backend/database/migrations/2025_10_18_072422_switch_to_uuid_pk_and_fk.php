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
         * Xóa ràng buộc khóa ngoại posts_user_id_foreign, pages_user_id_foreign, products_user_id_foreign
         */
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('posts_user_id_foreign');
        });
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign('pages_user_id_foreign');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_user_id_foreign');
        });

        /**
         * Xóa ràng buộc khóa chính id và đổi tên cột uuid thành id
         */
        DB::statement('ALTER TABLE users MODIFY `id` BIGINT UNSIGNED NOT NULL, DROP PRIMARY KEY');
        /**
         * Đổi tên cột id thành id_bigint (ko drop đc)
         */
        Schema::table('users', function (Blueprint $t) {
            $t->renameColumn('id', 'id_bigint'); // cần doctrine/dbal
        });
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('uuid', 'id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->primary('id');
        });

        foreach (['posts', 'pages', 'products'] as $table) {
            DB::statement("UPDATE {$table} SET user_uuid = (SELECT {$table}.user_uuid) WHERE user_uuid IS NULL"); // no-op an toàn
            DB::statement("ALTER TABLE {$table} MODIFY user_uuid CHAR(36) NOT NULL");
            Schema::table($table, function (Blueprint $t) {
                $t->dropColumn('user_id');
            });

            /**
             * Rename user_uuid column to user_id
             */
            Schema::table($table, function (Blueprint $t) {
                $t->renameColumn('user_uuid', 'user_id');
            });

            /**
             * Add foreign key constraint
             */
            Schema::table($table, function (Blueprint $t) {
                $t->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate()->restrictOnDelete();
            });
        }

        Schema::table('users', function (Blueprint $t) {
            $t->dropColumn('id_bigint');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
