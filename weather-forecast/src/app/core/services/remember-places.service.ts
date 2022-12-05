import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlace, LAST_PLACES } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RememberPlacesService {
  placesArray$$ = new BehaviorSubject<IPlace[]>([]);

  constructor(private storage: StorageService) {}

  remember(place: IPlace) {
    let arr = this.getLastPlaces();
    if (
      !arr.some(
        (i: IPlace) =>
          i.name === place.name &&
          i.country === place.country &&
          i.state === place.state
      )
    ) {
      arr.push(place);
      this.storage.setItem(LAST_PLACES, JSON.stringify(arr));
      this.emitPlaces();
    }
  }
  getLastPlaces() {
    return JSON.parse(this.storage.getItem(LAST_PLACES) || '[]');
  }
  emitPlaces() {
    this.placesArray$$.next(this.getLastPlaces());
  }
  getSubject() {
    this.emitPlaces();
    return this.placesArray$$;
  }
  clearPlaces() {
    this.storage.setItem(LAST_PLACES, JSON.stringify([]));
    this.emitPlaces();
  }
  delete(place:IPlace){
    console.log("delete", place)
    let arr = this.getLastPlaces();
    arr=arr.filter((i:IPlace)=> i.name !== place.name &&
    i.country !== place.country &&
    i.state !== place.state);
    this.storage.setItem(LAST_PLACES, JSON.stringify(arr));
    this.emitPlaces();
  }
}
