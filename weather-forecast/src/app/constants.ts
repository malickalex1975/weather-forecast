export const LANG = 'LANG';
export const THEME = 'THEME';
export const LAST_SEARCH = 'LAST_SEARCH';
export const LAST_PLACES = 'LAST_PLACES';
export const LAST_COORD = 'LAST_COORD';
export const USE_CURRENT_POSITION = 'USE_CURRENT_POSITION';
export const API_KEY = '9ce0d03cd9b9459245da9121910dfdb1';
export const BASE_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
export const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
export const POLLUTION_URL = 'https://api.openweathermap.org/data/2.5/air_pollution?';
export const BASE_ICON_URL = 'https://openweathermap.org/img/wn/';
export const ENDPOINT_ICON = '@2x.png';

export interface IPlace {
  lat?: number;
  lon?: number;
  name: string;
  country: string;
  state?: string;
  local_names?: ILocalNames;
}
export interface ILocalNames {
  feature_name?: string;
  ru?: string;
  en?: string;
}
export interface IWeather {
    coord?: {
      lon: number,
      lat: number
    },
    weather?: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ],
    base?: string,
    main?: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number
    },
    visibility?: number,
    wind?: {
      speed: number,
      deg: number,
      gust: number
    },
    pop?:number;
    rain?: {
      "1h": number,
      "3h": number,
    },
    snow?: {
      "1h": number,
      "3h": number,
    },
    clouds?: {
      all: number
    },
    dt?: number,
    sys?: {
      type: number,
      id: number,
      country: string,
      sunrise: number,
      sunset: number
    },
    timezone?: number,
    id?: number,
    name?: string,
    cod?: number
  }                        
export interface IPollution{
  "coord":[
    number,
    number
  ],
  "list":[
    {
      "dt":number,
      "main":{
        "aqi":number
      },
      "components":{
        "co":number,
        "no":number,
        "no2":number,
        "o3":number,
        "so2":number,
        "pm2_5":number,
        "pm10":number,
        "nh3":number
      }
    }
  ]
}