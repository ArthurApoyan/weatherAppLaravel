import axios from "axios";
export const setHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};
export const AxiosLaravel = axios.create({
    baseURL: "http://127.0.0.1:8000/api/auth/",
});

export const AxiosWeatherAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/proxy",
});

export const API_KEY:string = "d29a483b3a54e6bd035eb0fecd0209b6";
