import React from "react";
import GuestHeader from "../../Components/GuestHeader/GuestHeader"
import { Outlet } from "react-router";

const GuestLayout = () => {
    return (
        <>
            <GuestHeader/>

            <Outlet/>
        </>
    )
}

export default GuestLayout;
