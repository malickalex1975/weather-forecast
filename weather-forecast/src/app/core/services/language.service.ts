import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANG } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
language$$= new BehaviorSubject<string>("ru")
  constructor(private storage:StorageService) { 
    this.language$$.next(this.storage.getItem(LANG)||'ru')
  }
  getLang(){
    return this.language$$
  }
  setLang(lang:string){
    this.language$$.next(lang);
    this.storage.setItem(LANG,lang)
  }
}
