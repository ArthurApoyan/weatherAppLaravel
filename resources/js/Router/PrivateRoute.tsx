import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkIsAuth } from "../Features/Auth/AuthAPI";
import {User} from "../Types/types";
import {useAppDispatch} from "../store/hooks";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

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
                response ? <Outlet /> : <LoadingSpinner/>
            }
        </div>
    );
};

export default PrivateRoute;
