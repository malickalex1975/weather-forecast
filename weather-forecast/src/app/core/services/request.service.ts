import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LAST_SEARCH, LIST_REQUESTS } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  request$$ = new BehaviorSubject(this.storage.getItem(LAST_SEARCH));
  listRequests$$ = new BehaviorSubject(
    JSON.parse(this.storage.getItem(LIST_REQUESTS) || '[]')
  );
  coords$$ = new BehaviorSubject<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);
  isChosen$$ = new BehaviorSubject<boolean>(false);
  constructor(private storage: StorageService) {}

  getRequest() {
    return this.request$$;
  }
  getListRequests() {
    return this.listRequests$$;
  }
  setListRequests(value: string) {
    let arr = JSON.parse(this.storage.getItem(LIST_REQUESTS) || '[]');
    if (!arr.includes(value)) {
      arr.push(value);
    }
    if (arr.length > 10) {
      arr.shift();
    }
    this.listRequests$$.next(arr);
    this.storage.setItem(LIST_REQUESTS, JSON.stringify(arr));
  }
  getIsChosen() {
    return this.isChosen$$;
  }
  setIsChosen(value: boolean) {
    this.isChosen$$.next(value);
  }
  getCoords() {
    return this.coords$$;
  }
  setRequest(req: string) {
    let r = req.trim();
    if (r.length > 3) {
      this.request$$.next(r);
    } else {
      this.request$$.next('');
    }
  }
  setCoords(lat?: number, lon?: number) {
    this.coords$$.next([lat, lon]);
  }
}
