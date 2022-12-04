import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANG } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
language= new BehaviorSubject<string>("en")
  constructor(private storage:StorageService) { 
    this.language.next(this.storage.getItem(LANG)||'en')
  }
  getLang(){
    return this.language
  }
  setLang(lang:string){
    this.language.next(lang);
    this.storage.setItem(LANG,lang)
  }
}
