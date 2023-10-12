import { createSlice } from "@reduxjs/toolkit";
import { checkIsAuth, login, registration } from "./AuthAPI";
import {LoginUser, User} from "../../Types/types";

interface DataType {
    isAuth: boolean,
    user: User | null
}

const initialState:DataType = {
    isAuth: false,
    user: {} as User
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth=true
        });
        builder.addCase(checkIsAuth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
        builder.addCase(checkIsAuth.rejected, (state, action) => {
            state.user = null;
            state.isAuth = false;
        });
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
