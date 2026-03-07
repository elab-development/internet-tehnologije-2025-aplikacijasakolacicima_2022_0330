<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_route_exists()
    {
        $response = $this->postJson('/api/login', []);
        $this->assertNotEquals(404, $response->status());
    }

    public function test_login_fails_with_empty_data()
    {
        $response = $this->postJson('/api/login', []);
        $this->assertTrue(in_array($response->status(), [401, 422]));
    }

    public function test_admin_role_works()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->assertTrue($admin->isAdmin());
    }

    public function test_registered_user_role_works()
    {
        $user = User::factory()->create(['role' => 'registered_user']);
        $this->assertTrue($user->isRegistered());
    }

    public function test_user_factory_works()
    {
        $user = User::factory()->create();

        $this->assertNotNull($user->name);
        $this->assertNotNull($user->email);
        $this->assertNotNull($user->role);
    }
}
