import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BASE_ICON_URL, ENDPOINT_ICON, LANG } from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { DateService } from 'src/app/core/services/date.service';
import { GetCurrentPlaceService } from 'src/app/core/services/get-current-place.service';
import { HttpService } from 'src/app/core/services/http.service';
import { RememberPlacesService } from 'src/app/core/services/remember-places.service';
import { RequestService } from 'src/app/core/services/request.service';
import { SearchService } from 'src/app/core/services/search.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent {
  lat?: number;
  lon?: number;
  currentWeather$?: Observable<any>;
  forecast$?: Observable<any>;
  forecastDays$$ = this.dateService.emitDateArray();
  isChosen$$ = this.requestService.getIsChosen();
  isMoreInfo = false;
  tempColor$$ = this.colorService.emitColor();
  subscription4?: Subscription;
  subscription5?: Subscription;
  

  subscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private storage: StorageService,
    private requestService: RequestService,
    private colorService: ColorService,
    private dateService: DateService
  ) {}
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.lat = params['lat'];
      this.lon = params['lon'];
      if (this.lat && this.lon) {
        let currentLanguage = this.storage.getItem(LANG) || 'en';
        if (this.lat && this.lon) {
          this.currentWeather$ = this.http.getCurrentWeather(
            this.lat,
            this.lon,
            'metric',
            currentLanguage
          );
          this.subscription4 = this.currentWeather$.subscribe((weather: any) =>
            this.colorService.setTemp(weather?.main?.temp)
          );
          this.forecast$ = this.http.getForecast(
            this.lat,
            this.lon,
            'metric',
            currentLanguage
          );
          this.subscription5 = this.forecast$.subscribe((data) => {
            this.dateService.createDateArray(data.list);
          });
        }
      }
    });
  }
  convertPressure(p: number) {
    return (p * 0.750062).toFixed(0);
  }

  getFlagStyle(country: string) {
    if (country) {
      return `background-image: url(assets/img/png/${country?.toLowerCase()}.png)`;
    } else return '';
  }
  getIcon(icon: string) {
    if (!icon) icon = '01d';
    return BASE_ICON_URL + icon + ENDPOINT_ICON;
  }

  getMonth(month: number) {
    return this.dateService.getMonthByNumber(month);
  }
  getDayOfWeek(day: number) {
    return this.dateService.getDayOfWeek(day);
  }
  checkWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }
  defineDay(day: number, month: number) {
    return this.dateService.defineDay(day, month);
  }
  ngOnDestroy() {
    this.subscription4?.unsubscribe();
    this.subscription5?.unsubscribe();
  }
}
