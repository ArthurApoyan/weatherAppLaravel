import React, {useEffect, useRef, useState} from 'react';
import CloseIcon from "../../Utils/Icons/CloseIcon";
import {Places} from "../../Types/types";
import ListIcon from "../../Utils/Icons/ListIcon";
import DeleteIcon from "../../Utils/Icons/DeleteIcon";
import ArrowDownLeftIcon from "../../Utils/Icons/ArrowDownLeft";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../store/hooks";
import {addNewPlace, deletePlace, getPlaces, getWeather} from "../../Features/Weather/weatherAPI";
import axios from "axios";
import {AxiosWeatherAPI} from "../../axiosInstance";
import {OpenStreetMapProvider} from 'leaflet-geosearch';

const PlacesModal = ({places, setModalIsOpen}: { places: Places[], setModalIsOpen: Function }) => {

    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}, watch} = useForm<Places>()
    const storedData: string | null = localStorage.getItem('usersPlaces');
    const [usersPlaces, setUsersPlaces] = useState<Places[]>(storedData ? JSON.parse(storedData) : [...places]);
    const [draggedPlace, setDraggedPlace] = useState<null | Places>(null);
    const [searchResult, setSearchResult] = useState<string[][]>();
    const [checkedSearchResult, setCheckedSearchResult] = useState<string>("");
    const input = document.getElementById("search") as HTMLInputElement;
    let searchValue: string = watch("place_name");

    useEffect(() => {
        localStorage.setItem('usersPlaces', JSON.stringify(usersPlaces))
    }, [usersPlaces]);

    const handleSearchInputChange = async () => {
        const provider = new OpenStreetMapProvider();
        const results = await provider.search({query: searchValue});
        const arr = results.map(item => [item.label.split(",")[0], item.label.split(",")[1]]);
        setSearchResult(arr);
    }

    useEffect(() => {
        handleSearchInputChange()
    }, [searchValue]);

    const handleDragStart = (e: any, place: Places) => {
        console.log(place, "start")
        setDraggedPlace(place);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any, place: Places) => {
        e.preventDefault();

        setUsersPlaces([
            ...usersPlaces.map((item) => {
                if (item.id === place.id) {
                    return {...item, id: draggedPlace?.id};
                }
                if (item.id === draggedPlace?.id) {
                    return {...item, id: place.id};
                }
                return item;
            })
        ])
        setDraggedPlace(null);
    }

    const changeSearchInputValue = (value:string) => {
        if(input){
            input.setAttribute("value", value);
            input.value = value;
            searchValue = value;
            setCheckedSearchResult(value);
        }
    }

    const delPlace = async (id:number) => {
        await dispatch(deletePlace(id));
        setUsersPlaces([...usersPlaces.filter(item => item.id !== id)]);
    }

    const save =async (newPlace: Places) => {

        const coordinateResult = await AxiosWeatherAPI.post("/coordinates", {city: input.value})
        let data = [
            ...coordinateResult?.data?.coordinates?.map((item:any) => ({
                    lat: item.lat,
                    lon: item.lon
                })
            )
        ]

        const weather = await AxiosWeatherAPI.post("/weather", {...data[0]})

        if(weather.data.currentWeather.cod == 400){
            alert("Place not found...");
            input.setAttribute("value", "");
            input.value = "";
            return
        }

        dispatch(addNewPlace(input.value));
        dispatch(getWeather(input.value));
        dispatch(getPlaces());
        setModalIsOpen(false);
    }

    return (
        <div
            className="absolute top-[19%] left-[64%] border border-gray-500  rounded-lg p-3 shadow-[0_0_8px_1px_black] bg-white">
            <div className="flex items-center justify-between text-2xl">
                <p>Settings</p>
                <button className="mt-1" onClick={() => setModalIsOpen(false)}>
                    <CloseIcon/>
                </button>
            </div>
            <div
                className="h-60 w-[450px] overflow-auto border border-gray-900 mt-3 p-2 rounded"
                onDragOver={handleDragOver}
            >
                {
                    // @ts-ignore
                    usersPlaces.sort((a, b) => a.id - b.id).map((place: any) => {
                        return (
                            <div
                                key={place.id}
                                className="flex items-center justify-between gap-[100px] text-xl border border-gray-900 rounded-lg px-3 mt-2 bg-neutral-300"
                                draggable
                                onDragStart={(e) => handleDragStart(e, place)}
                                onDrop={(e) => handleDrop(e, place)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="cursor-grab">
                                        <ListIcon/>
                                    </div>
                                    <div
                                        className="mb-1 cursor-pointer text-2xl"
                                        onClick={() => {
                                            dispatch(getWeather(place.place_name));
                                            dispatch(getPlaces());
                                            setModalIsOpen(false)
                                        }}
                                    >{place.place_name}</div>
                                </div>
                                <div className="cursor-pointer" onClick={() => {
                                    delPlace(place.id);
                                }}>
                                    <DeleteIcon/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2">
                <form onSubmit={handleSubmit(save)}>
                    <div className="flex items-center">
                        <div className="w-full">
                            <label htmlFor="search" className="block mb-2 text-gray-900 font-medium">Add
                                Location</label>
                            <input type="text"
                                   id="search"
                                   className="border border-gray-300 rounded outline-blue-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[97%] p-1 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Place name"
                                   required
                                   {...register('place_name', {
                                       required: "Field is required",
                                       pattern: {value: /^([^0-9]*)$/, message: "Numbers not allowed"}
                                   })}
                            />
                            {errors.place_name && <p className="text-red-700">{errors.place_name.message}</p>}
                        </div>
                        <button className="mt-8">
                            <ArrowDownLeftIcon/>
                        </button>
                    </div>
                    {searchResult && searchResult[0]?.length && <ul className="h-[180px] mt-1 border overflow-auto">{searchResult.map((item, i) => {
                        return (
                            <li key={i}
                                className="cursor-pointer"
                                onClick={() => {changeSearchInputValue(`${item[0]}, ${item[1]}`)}}
                            >{item[0]}, {item[1]}</li>
                        )
                    })}</ul>}
                </form>
            </div>
        </div>
    );
};

export default PlacesModal;
