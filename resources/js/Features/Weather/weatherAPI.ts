import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_KEY, AxiosWeatherAPI} from "../../axiosInstance";
import {RootFiveWeather, Weather} from "../../Types/types";

export const getWeather = createAsyncThunk(
    "weather/getWeather",
    async function(inputValue:string){

        const coordinateResult = await AxiosWeatherAPI.get(`geo/1.0/direct?q=${inputValue}&limit=1&appid=${API_KEY}`)
        let data = [
            ...coordinateResult?.data?.map((item:any) => ({
                    lat: item.lat,
                    lon: item.lon
                })
            )
        ]

        const current = await AxiosWeatherAPI.get(`data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${API_KEY}`)
        const fiveDays = await AxiosWeatherAPI.get(`data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${API_KEY}`)

        return ({
            current: current.data,
            fiveDays: fiveDays.data
        } as {current:Weather, fiveDays:RootFiveWeather})
    }
)
