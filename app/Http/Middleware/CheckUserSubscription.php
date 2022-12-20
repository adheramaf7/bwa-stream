<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $status)
    {
        //jika user punya active subscription
        if ($status == '1' && $request->user()->activeSubscription == null) {
            return redirect()->route('subscription_plan.index');
        }

        if ($status == '0' && $request->user()->activeSubscription != null) {
            return redirect()->route('dashboard');
        }
        return $next($request);
    }
}
