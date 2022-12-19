<?php

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained();
            $table->foreignIdFor(SubscriptionPlan::class)->nullable()->constrained();
            $table->unsignedInteger('price')->nullable();
            $table->dateTime('expired_date')->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('snap_token')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_subscriptions');
    }
};
