<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubscriptionPlan::create([
            'name' => 'Basic',
            'price' => 299_000,
            'active_period_in_month' => 3,
            'features' => [
                'Feature 1',
                'Feature 2',
                'Feature 3',
            ]
        ]);

        SubscriptionPlan::create([
            'name' => 'Premium',
            'price' => 799_000,
            'active_period_in_month' => 3,
            'features' => [
                'Feature 1',
                'Feature 2',
                'Feature 3',
                'Feature 4',
                'Feature 5',
                'Feature 6',
            ]
        ]);
    }
}
