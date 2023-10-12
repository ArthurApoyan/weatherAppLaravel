import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getWeather} from "../Features/Weather/weatherAPI";
import {API_KEY} from "../axiosInstance";
import axios from "axios";

const CurrentWeather:React.FC = () => {

    const {current} = useAppSelector(state => state.weather);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getWeather("Yerevan"));
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=Yerevan&limit=1&appid=d29a483b3a54e6bd035eb0fecd0209b6`, config).then(({data}:{data:any})=>{
            console.log(data)
        })
    }, []);
    console.log(current)
    return (
        <div>

        </div>
    );
};

export default CurrentWeather;
