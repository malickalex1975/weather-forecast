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
    this.color$$.next(this.getColorByTemp(this.temp));
  }
  getColorByTemp(temp:number) {
    return temp < -10
      ? '#00c'
      : temp < 0
      ? '#0ae'
      : temp < 5
      ? '#0fe'
      : temp < 10
      ? '#0fd'
      : temp < 15
      ? '#0fc'
      : temp < 20
      ? '#0fa'
      : temp < 25
      ? '#0f5'
      : temp < 30
      ? '#ea0'
      : '#f00';
  }
  emitColor() {
   return this.color$$
  }
}
