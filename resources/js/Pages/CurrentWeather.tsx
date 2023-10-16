import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getPlaces, getWeather} from "../Features/Weather/weatherAPI";
import {API_KEY} from "../axiosInstance";
import axios from "axios";
import GearIcon from "../Utils/Icons/GearIcon";
import WindSpeedIcon from "../Utils/Icons/WindSpeedIcon";
import PressureIcon from "../Utils/Icons/PressureIcon";
import PlacesModal from "../Components/PlacesModal/PlacesModal";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const CurrentWeather: React.FC = () => {

    const dispatch = useAppDispatch();
    const {current, fiveDayForecast, places} = useAppSelector(state => state.weather);
    let {isLoading} = useAppSelector(state => state.weather);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [city, setCity] = useState<string>("");

    useEffect(() => {
        isLoading = true;
    }, []);

    const getCity = async (coordinates:{lat: number, lon: number} | undefined) => {
        const {data} = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates?.lat}+${coordinates?.lon}&key=33ec73f054cc4f1289213cc74d2b9298`)
        setCity(data.results[0].components.city);
        return data.results[0].components.city
    }

    const usersPlaces = localStorage.getItem('usersPlaces');

    useEffect(() => {
        const checkGeolocation = async () => {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const city = await getCity({lat: position.coords.latitude, lon: position.coords.longitude});

            if(city){
                dispatch(getWeather(city))
            }else if(usersPlaces) {
                dispatch(getWeather(JSON.parse(usersPlaces)[0].place_name))
            }else{
                dispatch(getWeather("Yerevan"))
            }
        }
        checkGeolocation();
        dispatch(getPlaces());
        isLoading = false;
    }, []);

    const icon = current?.weather?.map(item => item.icon);

    if(current.cod === 400){
        alert("Place not found");
        dispatch(getWeather("Yerevan"));
        dispatch(getPlaces());
        isLoading = false;
    }

    return (
        isLoading ? <LoadingSpinner/>
            :
            <div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center mt-10 pt-3">
                        <div className="flex items-center space-x-4 pl-12 gap-7">
                            <div className="text-6xl text-gray-500">{current?.name} {current?.sys?.country}</div>
                            <div>
                                <button className="mt-3" onClick={() => setModalIsOpen(!modalIsOpen)}>
                                    <GearIcon/>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="weatherIcon">
                                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"
                                     className="w-32"/>
                            </div>
                            <div className="text-5xl text-gray-900">{Math.floor(current?.main?.temp)} °C</div>
                        </div>
                        <div className="flex gap-10 text-2xl pl-4">
                            {
                                current?.weather?.map((item) => {
                                    return <p key={current.id}>Feels
                                        like {current?.main?.feels_like} °C. {item.main}. {item.description.replace(/^./, item.description[0].toUpperCase())}.</p>
                                })
                            }
                        </div>
                        <div className="flex gap-10 pl-4 mt-4 text-3xl">
                            <div className="flex items-center gap-2">
                                <div className="mt-1">
                                    <WindSpeedIcon/>
                                </div>
                                <div>
                                    {current?.wind?.speed} m/s
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="mt-1">
                                    <PressureIcon/>
                                </div>
                                <div>
                                    {current?.main?.pressure} hPa
                                </div>
                            </div>
                        </div>
                    </div>
                    {modalIsOpen && <PlacesModal places={places} setModalIsOpen={setModalIsOpen}/>}
                </div>
                <div className="p-3 w-full flex flex-col items-center mt-4">
                    <h3 className="text-center text-3xl text-gray-600">Five Days Forecast</h3>
                    <div className="flex w-full overflow-auto mt-5 m-auto pl-4 pb-3 scroll-smooth">
                        {fiveDayForecast?.list?.map((item) => {
                            return (
                                <div key={item.dt} className="mr-6 text-center border-none border-gray-600 rounded-xl p-2 bg-lime-50">
                                    <p className="w-32 text-xl text-center">{item.dt_txt}</p>
                                    <div className="flex items-center text-3xl">
                                        <div className="mr-2">{item.weather && item.weather[0].main}</div>
                                        <div><img
                                            src={`https://openweathermap.org/img/wn/${item.weather && item.weather[0].icon}@2x.png`}
                                            alt="icon" className="w-16"/></div>
                                    </div>
                                    <div
                                        className="text-2xl">{item.main && Math.floor(item.main.temp)} °C
                                    </div>
                                    <div>
                                        <div>Min {item.main && Math.floor(item.main.temp_min)} °C</div>
                                        <div>Max {item.main && Math.floor(item.main.temp_max)} °C</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
    );
};

export default CurrentWeather;
