import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  isStarted=false;
  isStarted$$ =new BehaviorSubject(false)

  constructor() { }

  setStarted(){
    this.isStarted=true
    this.isStarted$$.next(true)
  }
  resetStarted(){
    this.isStarted=false
    this.isStarted$$.next(false)
  }
  getStarted(){
    return this.isStarted
  }
  getStartedSubject(){
    return this.isStarted$$
  }
}
