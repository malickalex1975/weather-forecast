import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IPlace, LAST_COORD, LAST_SEARCH } from 'src/app/constants';
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
  listRequests$$ = this.requestService.getListRequests();
  isUseCurrentPosition = true;
  isFrameLoaded = false;
  currentPositionStyle = '';
  subscription1?: Subscription;
  subscription2?: Subscription;
  subscription3?: Subscription;
  subscription4?: Subscription;
  subscription5?: Subscription;
  subscription6?: Subscription;
  subscription7?: Subscription;
  subscription8?: Subscription;
  tempColor$$ = this.colorService.emitColor();
  lat?: number;
  lon?: number;

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
    this.init();
    window.onresize = () => this.calculateCurrentPositionStyle();
  }
  rememberSearch() {
    if (this.searchRequest) {
      this.storage.setItem(LAST_SEARCH, this.searchRequest);
    }
  }
  findPlaces() {
    this.requestService.setIsChosen(false);
    this.requestService.setRequest(this.searchRequest);
    this.isUseCurrentPosition=false
  }
  getCurrentWeather(lat?: number, lon?: number) {
    this.isFrameLoaded = false;
    setTimeout(() => this.loadFrame(lat!, lon!), 1000);
    this.requestService.setIsChosen(true);
    this.router.navigate(['forecast', lat, lon]);

    if (lat && lon && (lat !== 0 || lon !== 0)) {
      this.currentWeather$ = this.http.getCurrentWeather(lat!, lon!);
      if (!this.isUseCurrentPosition) {
        this.storage.setItem(LAST_COORD, JSON.stringify([lat, lon]));
      }
    }
  }
  rememberPlace(place: IPlace) {
    this.rememberPlaces.remember(place);
  }
  rememberCoords(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
    this.requestService.setCoords(lat, lon);
    this.storage.setItem(LAST_COORD, JSON.stringify([lat, lon]));
  }
  getFlagStyle(country: string) {
    if (country) {
      return `background-image: url(assets/img/png/${country?.toLowerCase()}.png)`;
    } else return '';
  }
  changeSearch() {
    this.getCurrentPlace.setUsedCurrent(this.isUseCurrentPosition);
    if (this.isUseCurrentPosition) {
      this.setCurrentPlaceCoords();
      this.useCurrentLocation();
      this.searchRequest = '';
    } else {
      this.useCoords();
      this.useRequest();
    }
  }
  useCurrentLocation() {
    if (
      this.isUseCurrentPosition === true &&
      this.lat !== 0 &&
      this.lon !== 0
    ) {
      this.getCurrentWeather(this.lat, this.lon);
    } else {
      setTimeout(() => this.init(), 1000);
    }
  }

  useCoords() {
    this.subscription3 = this.requestService
      .getCoords()
      .subscribe((data: [number | undefined, number | undefined]) => {
        if (data[0] || data[1]) {
          this.getCurrentWeather(...data);
          if (!this.isUseCurrentPosition) {
            [this.lat, this.lon] = data;
          }
          this.requestService.setIsChosen(true);
        }
      });
  }
  useRequest() {
    this.subscription1 = this.requestService
      .getRequest()
      .subscribe((data: string) => {
        this.searchRequest = data;
        this.rememberSearch();
      });
  }
  setCurrentPlaceCoords() {
    this.subscription7 = this.getCurrentPlace.getCoords().subscribe((data) => {
      this.lat = data.lat;
      this.lon = data.lon;
    });
  }

  define(value?: number) {
    return value !== 0 ? value?.toString() : "isn't defined";
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
    this.subscription4?.unsubscribe();
    this.subscription5?.unsubscribe();
    this.subscription6?.unsubscribe();
    this.subscription7?.unsubscribe();
    this.subscription8?.unsubscribe();
  }

  loadFrame(lat: number, lon: number) {
    let el = document.querySelector('.iframe') as HTMLIFrameElement;
    let google = document.querySelector('.google-iframe') as HTMLIFrameElement;
    google.onload = () => {
      this.isFrameLoaded = true;
      this.calculateCurrentPositionStyle();
    };
    google.onerror = () => (this.isFrameLoaded = false);
    el.src = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=${lat}&lon=${lon}&zoom=6`;
    google.src = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d100000!2d${lon}!3d${lat}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sby!4v1674040894710!5m2!1sru!2sby`;
  }
  init() {
    this.subscription8 = this.getCurrentPlace
      .getUsedCurrent()
      .subscribe((value) => {
        this.isUseCurrentPosition = value;
        this.requestService.setIsChosen(true);
        this.searchRequest = this.storage.getItem(LAST_SEARCH) || '';
        this.requestService.setCoords(
          ...JSON.parse(this.storage.getItem(LAST_COORD) || '[]')
        );

        if (this.isUseCurrentPosition) {
          this.setCurrentPlaceCoords();
          this.useCurrentLocation();
          this.searchRequest = '';
         
        } else {
          this.useCoords();
          this.useRequest();

        }
      });
  }

  calculateCurrentPositionStyle() {
    let google = document.querySelector('.google-iframe') as HTMLIFrameElement;
    let iframeRect = google.getBoundingClientRect();
    let currentTop = iframeRect.y + iframeRect.height / 2;
    let currentLeft = iframeRect.x + iframeRect.width / 2;
    let style = `top: ${currentTop - 25}px; left: ${currentLeft - 25}px;`;
    this.currentPositionStyle = style;
  }
  scrollDown(){
    const el=document.querySelector(".container1");
    if(el){
      let posY= el.getBoundingClientRect().y;
      window.scrollBy(0,posY-50)
    }
  }
}
