import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  API_KEY,
  BASE_GEO_URL,
  CURRENT_WEATHER_URL,
  FORECAST_URL,
  IPlace,
  POLLUTION_URL,
} from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getPlaces(place?: string): Observable<any> {
    return this.http.get(
      BASE_GEO_URL + `?q=${place}` + `&limit=5&appid=${API_KEY}`
    );
  }
  getCurrentWeather(
    lat: number,
    lon: number,
    units = 'metric',
    lang = 'en'
  ): Observable<any> {
    return this.http.get(
      CURRENT_WEATHER_URL +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`
    );
  }
  getCurrentPollution(
    lat: number | undefined,
    lon: number | undefined
  ): Observable<any> {
    if (lat && lon) {
      return this.http.get(
        POLLUTION_URL + `lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
    }
    return of([])
  }
  getForecast(
    lat: number,
    lon: number,
    units = 'metric',
    lang = 'en'
  ): Observable<any> {
    return this.http.get(
      FORECAST_URL +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`
    );
  }
}
