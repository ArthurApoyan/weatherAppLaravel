export type User = {
    id?: number,
    name: string,
    email: string,
    email_verified_at?: string,
    password: string,
    password_confirmation: string,
    remember_token?: string,
    created_at?: string,
    updated_at?: string
};

export type LoginUser = {
    access_token:string,
    token_type:string,
    expires_in:number,
    user:User
}

export type Weather = {
    coord: {
        lon: string,
        lat: string
    },
    weather: [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    rain: {
        "1h": number,
    },
    clouds: {
        all: number,
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface RootFiveWeather {
    cod: string
    message: number
    cnt: number
    list: List[]
    city: City
}

export interface List {
    dt?: number
    main?: Main
    weather?: FiveWeather[]
    clouds?: Clouds
    wind?: Wind
    visibility?: number
    pop?: number
    sys?: Sys
    dt_txt?: string
}

export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

export interface FiveWeather {
    id: number
    main: string
    description: string
    icon: string
}

export interface Clouds {
    all: number
}

export interface Wind {
    speed: number
    deg: number
    gust: number
}

export interface Sys {
    pod: string
}

export interface City {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export interface Coord {
    lat: number
    lon: number
}
