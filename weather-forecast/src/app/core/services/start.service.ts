import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartService {
  isStarted=false

  constructor() { }

  setStarted(){
    this.isStarted=true
  }
  getStarted(){
    return this.isStarted
  }
}
