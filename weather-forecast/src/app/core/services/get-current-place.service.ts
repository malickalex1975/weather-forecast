import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { USE_CURRENT_POSITION } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentPlaceService {
  attempts = 0;
  currentCoords$$ = new BehaviorSubject({ lat: 0, lon: 0 });
  isUsedCurrent$$ = new BehaviorSubject(
    JSON.parse(this.storage.getItem(USE_CURRENT_POSITION) || 'true')
  );
  constructor(private storage: StorageService) {}

  defineCurrentLocation() {
    let lat = 0;
    let lon = 0;

    let geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(
      (pos) => {
        this.attempts = 0;
        lat = pos?.coords?.latitude;
        lon = pos?.coords?.longitude;
        this.currentCoords$$.next({
          lat: Number(lat.toFixed(6)),
          lon: Number(lon.toFixed(6)),
        });
      },
      (err) => {
        console.log(err.message);
        if (this.attempts < 50) {
          setTimeout(() => {
            this.attempts++, this.defineCurrentLocation();
          }, 10);
        }
      },
      {
        timeout: 2000,
      }
    );
  }

  getCoords() {
    return this.currentCoords$$;
  }
  setUsedCurrent(value: boolean) {
    this.isUsedCurrent$$.next(value);
    this.storage.setItem(USE_CURRENT_POSITION, JSON.stringify(value));
  }
  getUsedCurrent() {
    return this.isUsedCurrent$$;
  }
}
