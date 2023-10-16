import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AxiosLaravel, setHeaders} from "../../axiosInstance";
import {useDispatch} from "react-redux";
import {checkIsAuth} from "../../Features/Auth/AuthAPI";

const Header = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = async () => {
        await AxiosLaravel.delete("logout", {headers: setHeaders()});
        localStorage.removeItem("token");
        localStorage.removeItem("usersPlaces");
        // @ts-ignore
        dispatch(checkIsAuth());
        navigate("/login");
    };

    return (
        <header>
            <nav className="flex justify-center bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="hidden justify-center items-center w-full lg:flex lg:w-auto ml-[23%]">
                    <ul className="flex flex-col gap-20 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link
                                to="/"
                                className={`block py-2 pl-3 pr-4 text-2xl text-gray-900 ${
                                    pathname == "/"
                                        ? "md:text-yellow-700 md:dark:text-yellow-500"
                                        : ""
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-800 md:p-0 md:dark:hover:text-yellow-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/currentWeather"
                                className={`block py-2 pl-3 pr-4 text-2xl text-gray-900 ${
                                    pathname == "/currentWeather"
                                        ? "md:text-yellow-700 md:dark:text-yellow-500"
                                        : ""
                                } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-800 md:p-0 md:dark:hover:text-yellow-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                aria-current="page"
                            >
                                Current Weather
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="ml-60 text-white" onClick={logOut}>
                    Log Out
                </button>
            </nav>
        </header>
    );
};

export default Header;
