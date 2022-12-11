import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LAST_SEARCH } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  request$$ = new BehaviorSubject(this.storage.getItem(LAST_SEARCH));
  coords$$ = new BehaviorSubject<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);
  constructor(private storage:StorageService) {}

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
