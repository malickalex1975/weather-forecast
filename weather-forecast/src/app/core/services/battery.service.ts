import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANG } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BatteryService {
  navigator: any = navigator;
  level$$ = new BehaviorSubject(0);
  color$$ = new BehaviorSubject('#0d0');
  isCharging$$ = new BehaviorSubject(false);
  dischargingTime$$ = new BehaviorSubject('');
  constructor(private storageService: StorageService) {
    this.defineParams();
    setInterval(() => this.defineParams(), 5000);
  }
  getIsCharging = () => this.isCharging$$;
  getDischargingTime = () => this.dischargingTime$$;

  getLevel() {
    return this.level$$;
  }
  getColor() {
    return this.color$$;
  }
  getBattery = async () => {
    if ('getBattery' in navigator) return await this.navigator.getBattery();
  };

  async defineParams() {
    if (!this.getBattery) {
      return;
    }
    let battery = await this.getBattery().catch((e) => console.log(e));
    //console.log(battery)
    this.isCharging$$.next(battery.charging);
    if (!battery.charging) {
      this.color$$.next(this.defineColor(battery.level));
    } else {
      this.color$$.next('#0f0');
    }
    this.level$$.next(battery.level);
    this.dischargingTime$$.next(this.defineTime(battery.dischargingTime));
  }
  defineColor(value: number) {
    return value > 0.8 ? '#0d0' : value > 0.25 ? '#cf0' : '#d00';
  }
  defineTime(value: number): string {
    let h = Math.floor(value / 3600);
    let m = Math.floor((value - h * 3600) / 60);
    return this.storageService.getItem(LANG) === 'en'
      ? `${h} h, ${m} min is remaining`
      : `${h} ч, ${m} мин осталось`;
  }
}
