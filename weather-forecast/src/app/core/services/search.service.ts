import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounce,
  debounceTime,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IPlace } from 'src/app/constants';
import { HttpService } from './http.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpService,
    private requestService: RequestService
  ) {}
  places: Observable<any> = of([]);

  findPlaces() {
    return this.places.pipe(
      switchMap(() => this.requestService.getRequest()),
      debounceTime(1000),
      switchMap((request) => {
        if (!request) {request=' '}
          return this.http.getPlaces(request);
        
      })
    );
  }
}
