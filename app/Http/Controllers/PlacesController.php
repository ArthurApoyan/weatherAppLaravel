<?php

namespace App\Http\Controllers;

use App\Models\Places;
use App\Repositories\PlacesRepository;
use Illuminate\Http\Request;

class PlacesController extends Controller
{
    protected $placesRepository;

    public function __construct(PlacesRepository $placesRepository){
        $this->placesRepository = $placesRepository;
    }

    public function index(){
        return $this->placesRepository->getPlacesByUserId();
    }

    public function store(Request $request){
        return $this->placesRepository->addNewPlaceToUser($request);
    }

    public function destroy(Places $place){
        $this->placesRepository->deletePlace($place);
    }
}
