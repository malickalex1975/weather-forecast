import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANG, THEME } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme= new BehaviorSubject<string>("light")
  constructor(private storage:StorageService) { 
    this.theme.next(this.storage.getItem(THEME)||'light')
  }
  getTheme(){
    return this.theme
  }
  setTheme(t:string){
    this.theme.next(t);
    this.storage.setItem(THEME,t)
  }
}
