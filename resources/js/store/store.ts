import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../Features/Auth/AuthSlice";
import weatherReducer from "../Features/Weather/weatherSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather: weatherReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
