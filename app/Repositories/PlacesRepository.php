<?php

namespace App\Repositories;

use App\Models\Places;
use App\Models\User;

class PlacesRepository implements PlacesRepositoryInterface {
    public function getAllPlaces()
    {
        $places = auth()->user()->with('places')->get();

        return $places;
    }
}
