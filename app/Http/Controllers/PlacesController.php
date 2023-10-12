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
        return $this->placesRepository->getAllPlaces();
    }

    public function show($placeId){

    }
}
