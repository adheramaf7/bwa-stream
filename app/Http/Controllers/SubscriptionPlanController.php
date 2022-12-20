<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatusEnum;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{

    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::all();
        return inertia('SubscriptionPlan/Index', compact('subscriptionPlans'));
    }

    public function subscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $user = $request->user();
        $userSubscription = $user->subscriptions()->create([
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            'expired_date' => now()->addMonths($subscriptionPlan->active_period_in_month),
            'payment_status' => PaymentStatusEnum::paid,
        ]);

        return redirect()->route('dashboard');
    }
}
