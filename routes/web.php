<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', '/login');

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'role:User'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('movies/{movie:slug}', [\App\Http\Controllers\MovieController::class, 'show'])->name('movies.show')->middleware('check_user_subscription:1');

    Route::group(['middleware' => 'check_user_subscription:0'], function () {
        Route::get('subscription-plan', [\App\Http\Controllers\SubscriptionPlanController::class, 'index'])->name('subscription_plan.index');
        Route::post('subscription-plan/{subscription_plan}/subscribe', [\App\Http\Controllers\SubscriptionPlanController::class, 'subscribe'])->name('subscription_plan.subscribe');
    });
});

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'role:Admin'], function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('movies', \App\Http\Controllers\Admin\MovieController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
