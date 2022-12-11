import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import {
  BASE_ICON_URL,
  ENDPOINT_ICON,
  IPlace,
  IWeather,
  LANG,
  LAST_COORD,
  LAST_SEARCH,
  USE_CURRENT_POSITION,
} from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { DateService } from 'src/app/core/services/date.service';
import { GetCurrentPlaceService } from 'src/app/core/services/get-current-place.service';
import { HttpService } from 'src/app/core/services/http.service';
import { RememberPlacesService } from 'src/app/core/services/remember-places.service';
import { RequestService } from 'src/app/core/services/request.service';
import { SearchService } from 'src/app/core/services/search.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { LastPlacesComponent } from './components/last-places/last-places.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isMoreInfo = false;
  searchRequest ='';
  places$ = this.searchService.findPlaces();
  currentWeather$?: Observable<any>;
  forecast$?: Observable<any>;
  forecastDays$$ = this.dateService.emitDateArray();
  isChosen = false;
  isUseCurrentPosition =
    JSON.parse(this.storage.getItem(USE_CURRENT_POSITION)) || false;
  subscription1?: Subscription;
  subscription2?: Subscription;
  subscription3?: Subscription;
  subscription4?: Subscription;
  subscription5?: Subscription;
  subscription6?: Subscription;
  tempColor$$ = this.colorService.emitColor();
  constructor(
    private storage: StorageService,
    private searchService: SearchService,
    private requestService: RequestService,
    private http: HttpService,
    private rememberPlaces: RememberPlacesService,
    private getCurrentPlace: GetCurrentPlaceService,
    private colorService: ColorService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.searchRequest = this.storage.getItem(LAST_SEARCH) || '';
    this.requestService.setCoords(...JSON.parse(this.storage.getItem(LAST_COORD)))
    this.subscription1 = this.requestService
      .getRequest()
      .subscribe((data: string) => {
        this.searchRequest = data;
        this.isChosen = false;
        this.rememberSearch();
      });
    this.useSubscriptionSecond()
    this.subscription3 = this.requestService
      .getCoords()
      .subscribe((data: [number | undefined, number | undefined]) => {
        this.getCurrentWeather(...data);
        this.getForecast(...data);
        this.isChosen = true;
      });
  }
  rememberSearch() {
    this.storage.setItem(LAST_SEARCH, this.searchRequest!);
  }
  findPlaces() {
    this.isChosen = false;
    this.requestService.setRequest(this.searchRequest);
  }
  getCurrentWeather(lat?: number, lon?: number) {
    this.storage.setItem(LAST_COORD, JSON.stringify([lat,lon]))
    this.isChosen = true;
    let currentLanguage = this.storage.getItem(LANG) || 'en';
    if (lat && lon) {
      this.currentWeather$ = this.http.getCurrentWeather(
        lat,
        lon,
        'metric',
        currentLanguage
      );
      this.subscription4 = this.currentWeather$.subscribe((weather: any) =>
        this.colorService.setTemp(weather?.main?.temp)
      );
    }
  }
  getForecast(lat?: number, lon?: number) {
    this.isChosen = true;
    let currentLanguage = this.storage.getItem(LANG) || 'en';
    if (lat && lon) {
      this.forecast$ = this.http.getForecast(
        lat,
        lon,
        'metric',
        currentLanguage
      );
      this.subscription5 = this.forecast$.subscribe((data) => {
        console.log(data);
        this.dateService.createDateArray(data.list);
      });
    }
  }

  getTime(time: number) {
    return new Date(time * 1000);
  }
  rememberPlace(place: IPlace) {
    this.rememberPlaces.remember(place);
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
  changeSearch() {
    this.storage.setItem(
      USE_CURRENT_POSITION,
      JSON.stringify(this.isUseCurrentPosition)
    );
    if (this.isUseCurrentPosition === false) {
      
      
    }else{ this.useSubscriptionSecond()}
  }
  useSubscriptionSecond(){
    this.subscription2 = this.getCurrentPlace
      .getPlace()
      .subscribe((data: any) => {
        if (this.isUseCurrentPosition === true) {
          this.getCurrentWeather(data.latitude, data.longitude);
          this.getForecast(data.latitude, data.longitude);
          this.searchRequest = data.city;
          this.rememberSearch();
        }
        else this.isChosen=false;
      });
  }
  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    this.subscription4?.unsubscribe();
    this.subscription5?.unsubscribe();
    this.subscription6?.unsubscribe();
  }
}
