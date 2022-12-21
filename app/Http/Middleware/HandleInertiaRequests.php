<?php

namespace App\Http\Middleware;

use App\Models\User;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'active_plan' => $this->userActivePlan($request->user()),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flashMessage' => [
                'message' => fn () => $request->session()->get('message'),
                'type' => fn () => $request->session()->get('type'),
            ],
        ]);
    }

    private function userActivePlan(?User $user)
    {
        if (is_null($user)) {
            return null;
        }

        $activeSubscription = $user->activeSubscription;

        if (is_null($activeSubscription)) {
            return null;
        }

        $activeSubscription->load('subscriptionPlan');

        $activeDays = $activeSubscription->expired_date->diffInDays($activeSubscription->updated_at);
        $remainingDays = now()->diffInDays($activeSubscription->expired_date);

        return [
            'name'           => $activeSubscription->subscriptionPlan->name,
            'is_premium'     => $activeSubscription->subscriptionPlan->name === 'Premium',
            'active_days'    => $activeDays,
            'remaining_days' => $remainingDays,
        ];
    }
}
