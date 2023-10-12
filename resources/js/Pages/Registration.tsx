import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { registration } from "../Features/Auth/AuthAPI";
import {User} from "../Types/types";
import {useAppDispatch} from "../store/hooks";


const Registration:React.FC = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<User>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const save = async (newUser: User) => {
        // @ts-ignore
        dispatch(registration(newUser))
            .unwrap()
            .then((data: {message:string, errors:any}) => {
                console.log(data, "data");
                if ("errors" in data) {
                    setError("email", {type: "email", message: data.errors.email[0]})
                } else {
                    navigate("/login");
                }
            })
    };

    return (
        <div className="w-full flex flex-col items-center">
            <form
                className="w-2/5 border-2 border-yellow-500 rounded-xl mt-20 p-5 bg-white dark:bg-gray-700"
                onSubmit={handleSubmit(save)}
            >
                <h2 className="text-center text-4xl text-yellow-500 dark:text-yellow-400">Registration</h2>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                        placeholder="Enter your fullname"
                        {...register("name", {
                            required: "Field is required",
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        E-mail
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                        placeholder="Enter your E-mail"
                        {...register("email", {
                            required: "Field is required",
                            pattern: {
                                value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Field is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="passwordConfirmation"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="text"
                        id="passwordConfirmation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                        placeholder="Confirm your password"
                        {...register("password_confirmation", {
                            required: "Field is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                        })}
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500">{errors.password_confirmation.message}</p>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <button
                        type="submit"
                        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                    >
                        Submit
                    </button>
                    <Link to="/login" className="text-indigo-500 mt-3">
                        Already have an account? Sign in.
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;
