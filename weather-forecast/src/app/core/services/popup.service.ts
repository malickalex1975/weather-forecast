import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeather } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  isVisible$$ = new BehaviorSubject(false);
  popupData$$ = new BehaviorSubject<IWeather|undefined>({});
  day$$=new BehaviorSubject([])
  constructor() {}
  setData(data?:IWeather){
    this.popupData$$.next(data);
    this.isVisible$$.next(true)
  }
  setVisibility(value:boolean){
    this.isVisible$$.next(value)
  }
  getData(){
    return this.popupData$$
  }
  getVisibility(){
    return this.isVisible$$
  }
  setDay(day:any){
    this.day$$.next(day)
  }
  getDay(){
    return  this.day$$
  }
}
