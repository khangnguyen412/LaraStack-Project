<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products_taxonomy_pivot', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('product_id')->index();
            $table->unsignedBigInteger('taxonomy_id')->index();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('taxonomy_id')->references('id')->on('products_taxonomy')->onDelete('cascade');
            $table->primary(['product_id', 'taxonomy_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_taxonomy_pivot');
    }
};
