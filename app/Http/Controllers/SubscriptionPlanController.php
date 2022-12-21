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
        $midtransClientKey = env('MIDTRANS_CLIENT_KEY');
        $userSubscription = null;
        return inertia('SubscriptionPlan/Index', compact('subscriptionPlans', 'userSubscription', 'midtransClientKey'));
    }

    public function subscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        //START: prepare midtrans config
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = env('MIDTRANS_IS_3DS');
        //END: prepare midtrans config


        $user = $request->user();
        $userSubscription = $user->subscriptions()->create([
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            // 'expired_date' => now()->addMonths($subscriptionPlan->active_period_in_month),
            'payment_status' => PaymentStatusEnum::pending,
        ]);

        $params = array(
            'transaction_details' => array(
                'order_id' => $userSubscription->id . '-' . substr(microtime(), -5),
                'gross_amount' => $userSubscription->price,
            )
        );
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $userSubscription->snap_token = $snapToken;
        $userSubscription->save();

        return inertia('SubscriptionPlan/Index', compact('userSubscription'));
    }
}
