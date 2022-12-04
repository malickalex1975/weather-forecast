export const LANG = 'LANG';
export const THEME = 'THEME';
export const LAST_SEARCH = 'LAST_SEARCH';
export const LAST_PLACES = 'LAST_PLACES';
export const API_KEY = '9ce0d03cd9b9459245da9121910dfdb1';
export const BASE_GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';
export const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

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
    rain?: {
      "1h": 3.16
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
