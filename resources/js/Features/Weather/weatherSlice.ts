import {createSlice} from "@reduxjs/toolkit";
import {Places, RootFiveWeather, User, Weather} from "../../Types/types";
import {getPlaces, getWeather} from "./weatherAPI";

interface DataType {
    isLoading: boolean,
    current: Weather,
    fiveDayForecast: RootFiveWeather,
    places: Places[]
}

const initialState:DataType = {
    isLoading: false,
    current: {} as Weather,
    fiveDayForecast: {} as RootFiveWeather,
    places: []
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeather.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getWeather.fulfilled, (state, action) => {
            state.isLoading = false
            state.current = action.payload.current
            state.fiveDayForecast = action.payload.fiveDays
        })
        builder.addCase(getPlaces.fulfilled, (state, action) => {
            state.places = action.payload
        })
    }
})

export default weatherSlice.reducer;
