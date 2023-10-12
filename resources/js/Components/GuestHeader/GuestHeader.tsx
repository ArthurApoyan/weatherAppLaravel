import React from "react";
import { Link, useLocation } from "react-router-dom";

const GuestHeader = () => {

    const {pathname} = useLocation();

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div
                    className="hidden justify-center items-center w-full lg:flex lg:w-auto lg:order-1"
                >
                    <ul className="flex flex-col gap-20 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link
                                to="/"
                                className={`block py-2 pl-3 pr-4 text-2xl text-gray-900 ${pathname == "/" ? "md:text-yellow-700 md:dark:text-yellow-500" : ""} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-800 md:p-0 md:dark:hover:text-yellow-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                aria-current="page"
                            >
                                Registration
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className={`block py-2 pl-3 pr-4 text-2xl text-gray-900 ${pathname == "/login" ? "md:text-yellow-700 md:dark:text-yellow-500" : ""} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-800 md:p-0 md:dark:hover:text-yellow-600 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Log In
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default GuestHeader;
