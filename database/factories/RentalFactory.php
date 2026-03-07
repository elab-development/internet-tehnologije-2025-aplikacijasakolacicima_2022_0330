<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Rental;

class RentalFactory extends Factory
{
    protected $model = Rental::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'vehicle_id' => Vehicle::factory(),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'status' => 'active',
            'total_price' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}