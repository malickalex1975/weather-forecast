import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }
  getHash(data:string){
    let hash = 0;
    let str = String(data);
    if (str.length == 0) return hash;
    for ( let i = 0; i < str.length; i++) {
       let char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; 
    }
    return hash;
  }
}
