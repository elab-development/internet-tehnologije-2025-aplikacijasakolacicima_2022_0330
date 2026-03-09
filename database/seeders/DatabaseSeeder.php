<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        if (User::count() == 0) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@test.com',
                'password' => bcrypt('password123'),
                'role' => 'admin',
            ]);
        }

        if (Vehicle::count() == 0) {
            Vehicle::create([
                'brand' => 'BMW',
                'model' => 'X5',
                'registration_number' => 'BG-001-AA',
                'year' => 2022,
                'daily_price' => 100,
                'color' => 'crna',
                'mileage' => 50000,
                'fuel_type' => 'dizel',
                'transmission' => 'automatski',
                'seats' => 5,
                'status' => 'available',
            ]);
        }
    }
}
