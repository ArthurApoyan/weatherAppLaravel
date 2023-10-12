import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkIsAuth } from "../Features/Auth/AuthAPI";
import {User} from "../Types/types";
import {useAppDispatch} from "../store/hooks";

const PrivateRoute = () => {
    const [response, setResponse] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsAuth()).unwrap()
            .then((data:User) => {
                setResponse(true);
            })
            .catch((error:any) => {
                setResponse(true);
            });
    }, []);


    return (
        <div>
            {
                response ? <Outlet /> : <h1>Loading...</h1>
            }
        </div>
    );
};

export default PrivateRoute;
