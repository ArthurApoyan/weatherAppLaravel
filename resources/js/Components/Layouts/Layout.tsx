import React from "react";
import Header from "../../Components/Header/Header"
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <>
            <Header/>

            <Outlet/>
        </>
    )
}

export default Layout;
