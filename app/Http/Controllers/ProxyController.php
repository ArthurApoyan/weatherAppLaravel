<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{
    public function makeRequestForCoordinates(Request $request)
    {
        $city = $request->input('city');
        $apiKey = 'd29a483b3a54e6bd035eb0fecd0209b6';

        $coordinateUrl = "https://api.openweathermap.org/geo/1.0/direct?q=$city&limit=1&appid=$apiKey";

        $response = [
            'coordinates' => Http::get($coordinateUrl)->json(),
        ];

        return response()->json($response);
    }

    public function makeRequestForWeather(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $apiKey = 'd29a483b3a54e6bd035eb0fecd0209b6';

        $currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=$apiKey";
        $fiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=$lat&lon=$lon&units=metric&appid=$apiKey";

        $response = [
            'currentWeather' => Http::get($currentWeatherUrl)->json(),
            'fiveDays' => Http::get($fiveDaysUrl)->json(),
        ];

        return response()->json($response);
    }
}
