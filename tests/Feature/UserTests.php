<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTests extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testUserCanRegister(): void
    {
        $response = $this->post('/api/auth/register', [
            'name' => 'Some Name',
            'email' => 'someEmail@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['name' => 'Some Name']);
    }

    public function testUserCanLogin(): void
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'someEmail@gmail.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
    }
}
