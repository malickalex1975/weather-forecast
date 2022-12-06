import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IPlace, LANG, LAST_SEARCH } from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
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
  @ViewChild(LastPlacesComponent, { static: false })
  private lastPlaces: LastPlacesComponent | undefined;
  isMoreInfo = false;
  searchRequest = '';
  places$ = this.searchService.findPlaces();
  currentWeather$?: Observable<any>;
  isChosen = false;
  subscription1?: Subscription;
  subscription2?: Subscription;
  subscription3?: Subscription;
  subscription4?: Subscription;
  tempColor$$ = this.colorService.emitColor();
  constructor(
    private storage: StorageService,
    private searchService: SearchService,
    private requestService: RequestService,
    private http: HttpService,
    private rememberPlaces: RememberPlacesService,
    private getCurrentPlace: GetCurrentPlaceService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.searchRequest = this.storage.getItem(LAST_SEARCH) || '';
    this.subscription1 = this.requestService
      .getRequest()
      .subscribe((data: string) => {
        this.searchRequest = data;
        this.isChosen = false;
        this.rememberSearch();
      });
    this.subscription2 = this.getCurrentPlace
      .getPlace()
      .subscribe((data: any) => {
        this.getCurrentWeather(data.latitude, data.longitude);
        this.searchRequest = data.city;
        this.rememberSearch();
      });
    this.subscription3 = this.requestService
      .getCoords()
      .subscribe((data: [number | undefined, number | undefined]) => {
        this.getCurrentWeather(...data);
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
  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    this.subscription4?.unsubscribe();
  }
}
