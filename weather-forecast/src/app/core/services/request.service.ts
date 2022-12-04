import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  request$$ = new BehaviorSubject('');
  coords$$ = new BehaviorSubject<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);
  constructor() {}

  getRequest() {
    return this.request$$;
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
