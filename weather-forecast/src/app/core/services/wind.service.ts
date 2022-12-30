import { Injectable } from '@angular/core';
import { LANG } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class WindService {
  windsEn = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW','N'];
  windsRu = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ', 'С'];
  constructor(private storage: StorageService) {}

  getWind(deg: number) {
    let index = Math.round(deg / 45);
    return this.storage.getItem(LANG) === 'en'
      ? this.windsEn[index]
      : this.windsRu[index];
  }
}
