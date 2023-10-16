<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProxyController;

Route::post('/proxy/coordinates', [ProxyController::class, 'makeRequestForCoordinates']);
Route::post('/proxy/weather', [ProxyController::class, 'makeRequestForWeather']);
Route::post('/proxy/searchPlace', [ProxyController::class, 'makeRequestForSearchPlace']);

Route::get('/', function () {
    return view('index');
});

Route::get('/login', function () {
    return view('index');
});

Route::get('/currentWeather', function () {
    return view('index');
});
