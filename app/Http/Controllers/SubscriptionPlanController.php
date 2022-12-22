<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Enums\PaymentStatusEnum;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\Log;

class SubscriptionPlanController extends Controller
{

    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::all();
        $midtransClientKey = env('MIDTRANS_CLIENT_KEY');
        return inertia('SubscriptionPlan/Index', compact('subscriptionPlans', 'midtransClientKey'));
    }

    private function initMidtransConfig()
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
    }

    public function subscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $this->initMidtransConfig();

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

        return $userSubscription;
    }

    public function midtransCallback(Request $request)
    {
        $this->initMidtransConfig();

        $notif = new \Midtrans\Notification();

        Log::info(json_encode($notif));

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = PaymentStatusEnum::pending;
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = PaymentStatusEnum::paid;
                $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_month);
            }
        } else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = PaymentStatusEnum::failed;
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = PaymentStatusEnum::failed;
            }
        } else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = PaymentStatusEnum::failed;
        } else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = PaymentStatusEnum::paid;
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_month);
        } else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = PaymentStatusEnum::pending;
        } else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = PaymentStatusEnum::failed;
        }

        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }
}
