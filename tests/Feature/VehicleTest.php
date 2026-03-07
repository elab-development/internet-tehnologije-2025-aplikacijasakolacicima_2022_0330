<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Vehicle;
use App\Models\User;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    public function test_vehicles_route_exists()
    {
        $response = $this->getJson('/api/vehicles');
        $this->assertNotEquals(404, $response->status());
    }

    public function test_can_list_vehicles()
    {
        $response = $this->getJson('/api/vehicles');
        $response->assertStatus(200);
    }

    public function test_returns_404_for_nonexistent_vehicle()
    {
        $response = $this->getJson('/api/vehicles/99999');
        $response->assertStatus(404);
    }

    public function test_vehicle_factory_works()
    {
        $vehicle = Vehicle::factory()->create();

        $this->assertNotNull($vehicle->brand);
        $this->assertNotNull($vehicle->model);
        $this->assertNotNull($vehicle->daily_price);
    }

    public function test_available_scope_works()
    {
        Vehicle::factory()->create(['status' => 'available']);
        Vehicle::factory()->create(['status' => 'rented']);

        $available = Vehicle::available()->get();
        $this->assertEquals(1, $available->count());
    }

    public function test_vehicle_is_available_method()
    {
        $vehicle = Vehicle::factory()->create(['status' => 'available']);
        $this->assertTrue($vehicle->isAvailable());
    }

    public function test_vehicle_is_rented_method()
    {
        $vehicle = Vehicle::factory()->create(['status' => 'rented']);
        $this->assertTrue($vehicle->isRented());
    }
}