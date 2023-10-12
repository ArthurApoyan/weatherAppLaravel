import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Layout from "../Components/Layouts/Layout";
import Home from "../Pages/Home";
import Registration from "../Pages/Registration";
import GuestLayout from "../Components/Layouts/GuestLayout";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import { checkIsAuth } from "../Features/Auth/AuthAPI";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import CurrentWeather from "../Pages/CurrentWeather";

const Router = () => {
    const { isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsAuth());
    }, []);

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                {
                    isAuth ? <Route path="/" element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/currentWeather" element={<CurrentWeather />} />
                        </Route>
                        : <Route path="/" element={<GuestLayout />}>
                            <Route path="/" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                        </Route>
                }
            </Route>
        </Routes>
    );
};

export default Router;
