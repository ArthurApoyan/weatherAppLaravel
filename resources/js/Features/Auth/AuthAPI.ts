import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosLaravel, setHeaders } from "../../axiosInstance";
import {LoginUser, User} from "../../Types/types";

export const registration = createAsyncThunk(
    "auth/registration",
    async (newUser:User) => {
        try {
            const { data } = await AxiosLaravel.post("register", newUser);
            return data;
        } catch (e:any) {
            return e.response.data;
        }
    }
);

export const login = createAsyncThunk("auth/login", async (user:{email:string, password:string}) => {
    const { data }:{data:LoginUser} = await AxiosLaravel.post("login", user);
    localStorage.setItem("token", data.access_token);
    return data.user;
});

export const checkIsAuth = createAsyncThunk("auth/checkIsAuth", async () => {
    const { data }:{data:User} = await AxiosLaravel.get("user-profile", {
        headers: setHeaders(),
    });
    return data;
});
