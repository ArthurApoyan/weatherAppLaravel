<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PlacesTests extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testCanAddNewPlace(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2OTc0NTc4MDgsImV4cCI6MTY5NzQ2MTQwOCwibmJmIjoxNjk3NDU3ODA4LCJqdGkiOiJrdEY0VWdiME91dFg0QzNnIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.d1ClG_cuAzD2i2qiBnwlB5jt1kVXNGIfV3o3-7RllHA",
        ])->post('/api/auth/places', [
            'place_name' => 'Some Place Name'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('places', ['place_name' => 'Some Place Name']);
    }
}
