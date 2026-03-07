<?php

namespace Database\Factories;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    protected $model = Vehicle::class;

    public function definition()
    {
        return [
            'brand' => $this->faker->randomElement(['BMW', 'Audi', 'Mercedes']),
            'model' => $this->faker->randomElement(['X5', 'A6', 'C200']),
            'registration_number' => strtoupper($this->faker->unique()->bothify('??-###-??')),
            'year' => $this->faker->numberBetween(2015, 2024),
            'daily_price' => $this->faker->numberBetween(30, 150),
            'color' => 'crna',
            'mileage' => $this->faker->numberBetween(10000, 200000),
            'fuel_type' => 'dizel',
            'transmission' => 'automatski',
            'seats' => 5,
            'status' => 'available',
        ];
    }
}
