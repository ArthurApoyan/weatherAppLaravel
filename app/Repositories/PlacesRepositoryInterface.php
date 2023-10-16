<?php

namespace App\Repositories;

interface PlacesRepositoryInterface {
    public function getPlacesByUserId();
    public function addNewPlaceToUser($request);
    public function deletePlace($place);
}
