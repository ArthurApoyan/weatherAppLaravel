<?php

namespace App\Repositories;

use App\Models\Places;
use App\Models\User;
use App\Models\UsersPlaces;

class PlacesRepository implements PlacesRepositoryInterface {
    public function getPlacesByUserId()
    {
        $userPlaces = User::find(auth()->user()->id)->places;

        $placeIds = $userPlaces->pluck('id');

        $places = Places::whereIn('id', $placeIds)->get();

        return $places;
    }

    public function addNewPlaceToUser($request)
    {
        $searchForNoRepeat = Places::where('place_name', '=', $request->place_name)->first();

        if(!$searchForNoRepeat){
            $place = Places::create([
                "place_name" => $request->place_name,
            ]);

            UsersPlaces::create([
                "user_id" => auth()->user()->id,
                "place_id" => $place->id
            ]);
        }else{
            UsersPlaces::create([
                "user_id" => auth()->user()->id,
                "place_id" => $searchForNoRepeat->id
            ]);
        }

        return $place;
    }

    public function deletePlace($place)
    {
        $id = $place->id;
        $deletedPlace = UsersPlaces::where('place_id', '=', $id)->first();
        $deletedPlace->delete();
    }
}
