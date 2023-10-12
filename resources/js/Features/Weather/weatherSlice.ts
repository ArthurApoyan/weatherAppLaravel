import {createSlice} from "@reduxjs/toolkit";
import {RootFiveWeather, User, Weather} from "../../Types/types";
import {getWeather} from "./weatherAPI";

interface DataType {
    current: Weather,
    fiveDayForecast: RootFiveWeather
}

const initialState:DataType = {
    current: {} as Weather,
    fiveDayForecast: {} as RootFiveWeather
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeather.fulfilled, (state, action) => {
            state.current = action.payload.current
            state.fiveDayForecast = action.payload.fiveDays
        })
    }
})

export default weatherSlice.reducer;
