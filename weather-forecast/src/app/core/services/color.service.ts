import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  temp = 0;
  color$$ = new BehaviorSubject<string>('#ccffee');
  constructor() {}
  setTemp(t: number) {
    this.temp = t;
    this.color$$.next(this.getColorByTemp());
  }
  getColorByTemp() {
    return this.temp < -10
      ? '#00c'
      : this.temp < 0
      ? '#0ae'
      : this.temp < 5
      ? '#0fe'
      : this.temp < 10
      ? '#0fd'
      : this.temp < 15
      ? '#0fc'
      : this.temp < 20
      ? '#0fa'
      : this.temp < 25
      ? '#0f5'
      : this.temp < 30
      ? '#ea0'
      : '#f00';
  }
  emitColor() {
   return this.color$$
  }
}
