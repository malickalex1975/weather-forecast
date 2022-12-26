import { Injectable } from '@angular/core';
import {
  debounceTime,
  Observable,
  of,
  switchMap,
} from 'rxjs';
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
        if (request) {
        this.requestService.setListRequests(request)
          return this.http.getPlaces(request);
        } else return of([])
      })
    );
  }
}
