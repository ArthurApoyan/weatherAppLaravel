import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_KEY, AxiosLaravel, AxiosWeatherAPI, setHeaders} from "../../axiosInstance";
import {RootFiveWeather, Weather} from "../../Types/types";

export const getWeather = createAsyncThunk(
    "weather/getWeather",
    async function(inputValue:string){

        const coordinateResult = await AxiosWeatherAPI.post("/coordinates", {city: inputValue})
        let data = [
            ...coordinateResult?.data?.coordinates?.map((item:any) => ({
                    lat: item.lat,
                    lon: item.lon
                })
            )
        ]

        const weather = await AxiosWeatherAPI.post("/weather", {...data[0]})

        return ({
            current: weather.data.currentWeather,
            fiveDays: weather.data.fiveDays
        } as {current:Weather, fiveDays:RootFiveWeather})
    }
)

export const getPlaces = createAsyncThunk(
    "weather/getPlaces",
    async function (){
        const {data} = await AxiosLaravel.get("places", {headers: setHeaders()});
        return data;
    }
)

export const addNewPlace = createAsyncThunk(
    "weather/addNewPlace",
    async function (placeName:string){
        const {data} = await AxiosLaravel.post("places", {place_name:placeName}, {headers: setHeaders()});
        const storedData = localStorage.getItem('usersPlaces')
        storedData && localStorage.setItem('usersPlaces', JSON.stringify([...JSON.parse(storedData), data]))
        return data;
    }
)

export const deletePlace = createAsyncThunk(
    "weather/deletePlace",
    async function (id:number){
        const {data} = await AxiosLaravel.delete(`places/${id}`, {headers: setHeaders()});
        const storedData = localStorage.getItem('usersPlaces')
        storedData && localStorage.setItem('usersPlaces', JSON.stringify([...JSON.parse(storedData)].filter(item => item.id !== id)))
        return data;
    }
)
