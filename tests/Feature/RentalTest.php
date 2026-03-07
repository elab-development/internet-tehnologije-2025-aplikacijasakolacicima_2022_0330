<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Rental;

class RentalTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Kreiramo i logujemo korisnika za sve testove
        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'sanctum'); // koristi Laravel Sanctum za auth
    }

    public function test_rentals_route_exists()
    {
        $vehicle = Vehicle::factory()->create();
        $rental = Rental::factory()->create([
            'user_id' => $this->user->id,
            'vehicle_id' => $vehicle->id,
            'status' => 'active',
            'total_price' => 200,
        ]);

        $response = $this->getJson("/api/rentals/{$rental->id}");
        $this->assertNotEquals(404, $response->status());
    }

    public function test_can_view_single_rental()
    {
        $vehicle = Vehicle::factory()->create();
        $rental = Rental::factory()->create([
            'user_id' => $this->user->id,
            'vehicle_id' => $vehicle->id,
            'status' => 'active',
            'total_price' => 200,
        ]);

        $response = $this->getJson("/api/rentals/{$rental->id}");
        $response->assertStatus(200);

        $response->assertJson([
            'renta' => [
                'id' => $rental->id,
                'user_id' => $this->user->id,
                'vehicle_id' => $vehicle->id,
                'status' => 'active',
                'total_price' => 200,
            ]
        ]);
    }

    public function test_returns_404_for_nonexistent_rental()
    {
        $response = $this->getJson('/api/rentals/99999');
        $response->assertStatus(404);
    }

    public function test_can_create_rental()
    {
        $vehicle = Vehicle::factory()->create(['status' => 'available']);

        $rentalData = [
            'user_id' => $this->user->id,
            'vehicle_id' => $vehicle->id,
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(3)->toDateString(),
            'status' => 'active',
            'total_price' => 300,
        ];

        $response = $this->postJson('/api/rentals', $rentalData);
        $response->assertStatus(201);

        $this->assertDatabaseHas('rentals', [
            'user_id' => $this->user->id,
            'vehicle_id' => $vehicle->id,
            'status' => 'na_cekanju',
        ]);
    }
}