import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  IPlace,
  LAST_COORD,
  LAST_SEARCH,
  USE_CURRENT_POSITION,
} from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { GetCurrentPlaceService } from 'src/app/core/services/get-current-place.service';
import { HttpService } from 'src/app/core/services/http.service';
import { RememberPlacesService } from 'src/app/core/services/remember-places.service';
import { RequestService } from 'src/app/core/services/request.service';
import { SearchService } from 'src/app/core/services/search.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isMoreInfo = false;
  searchRequest = '';
  places$ = this.searchService.findPlaces();
  currentWeather$?: Observable<any>;
  isChosen$$ = this.requestService.getIsChosen();
  listRequests$$=this.requestService.getListRequests()
  isUseCurrentPosition =
    JSON.parse(this.storage.getItem(USE_CURRENT_POSITION) || 'false');
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestService.setIsChosen(true);
    this.searchRequest = this.storage.getItem(LAST_SEARCH) || '';
    this.requestService.setCoords(
      ...JSON.parse(this.storage.getItem(LAST_COORD))
    );
    this.subscription1 = this.requestService
      .getRequest()
      .subscribe((data: string) => {
        this.searchRequest = data;
        this.rememberSearch();
      });
    this.useSubscriptionSecond();
    this.subscription3 = this.requestService
      .getCoords()
      .subscribe((data: [number | undefined, number | undefined]) => {
        this.getCurrentWeather(...data);
        this.requestService.setIsChosen(true);
      });
  }
  rememberSearch() {
    if (this.searchRequest) {
      this.storage.setItem(LAST_SEARCH, this.searchRequest);
    }
  }
  findPlaces() {
    this.requestService.setIsChosen(false);
    this.requestService.setRequest(this.searchRequest);
  }
  getCurrentWeather(lat?: number, lon?: number) {
    this.requestService.setIsChosen(true);
    this.router.navigate(['forecast', lat, lon]);
    this.storage.setItem(LAST_COORD, JSON.stringify([lat, lon]));
    if (lat && lon) {
      this.currentWeather$ = this.http.getCurrentWeather(lat!, lon!);
    }
  }

  rememberPlace(place: IPlace) {
    this.rememberPlaces.remember(place);
  }

  getFlagStyle(country: string) {
    if (country) {
      return `background-image: url(assets/img/png/${country?.toLowerCase()}.png)`;
    } else return '';
  }
  changeSearch() {
    this.storage.setItem(
      USE_CURRENT_POSITION,
      JSON.stringify(this.isUseCurrentPosition)
    );
    if (this.isUseCurrentPosition) {
      this.useSubscriptionSecond();
    }
  }
  useSubscriptionSecond() {
    this.subscription2 = this.getCurrentPlace
      .getPlace()
      .subscribe((data: any) => {
        if (this.isUseCurrentPosition === true) {
          this.getCurrentWeather(data.latitude, data.longitude);
          this.searchRequest = data.city;
          this.rememberSearch();
        } 
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
