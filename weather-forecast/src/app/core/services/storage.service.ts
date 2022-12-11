import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key:string){
    return localStorage.getItem(key) || 'null'
  }
  setItem(key:string,value:string){
    localStorage.setItem(key,value)
  }
}
