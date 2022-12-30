import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BASE_ICON_URL, ENDPOINT_ICON, IWeather } from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { DateService } from 'src/app/core/services/date.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { WindService } from 'src/app/core/services/wind.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
  day$$=this.popupService.getDay()
  isVisible$$ = this.popupService.getVisibility();
  weather$$ = this.popupService.getData();
  weather?: IWeather;
  subscription?: Subscription;
  isWindHovered = false;
  constructor(
    private popupService: PopupService,
    private colorService: ColorService,
    private windService: WindService,
    private dateService: DateService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.weather$$.subscribe(
      (data: any) => (this.weather = data)
    );
  }
  getTime(time: number) {
    return new Date(time * 1000).getHours().toString() + ':00';
  }

  convertPressure(p: number) {
    return (p * 0.750062).toFixed(0);
  }

  getIcon(icon: string | undefined) {
    if (!icon) icon = '01d';
    return BASE_ICON_URL + icon + ENDPOINT_ICON;
  }
  getRain(index: string) {
    if (this.weather?.rain && index === '1h') {
      return this.weather?.rain['1h'];
    } else if (this.weather?.rain && index === '3h') {
      return this.weather?.rain['3h'];
    } else return null;
  }
  getSnow(index: string) {
    if (this.weather?.snow && index === '1h') {
      return this.weather?.snow['1h'];
    } else if (this.weather?.snow && index === '3h') {
      return this.weather?.snow['3h'];
    } else return null;
  }
  getColor(temp: number) {
    return this.colorService.getColorByTemp(temp);
  }
  defineWind(deg: number) {
    return this.windService.getWind(deg);
  }
  close() {
    this.popupService.setVisibility(false);
  }
  getMonth(month: number) {
    return this.dateService.getMonthByNumber(month);
  }
  getDayOfWeek(day: number) {
    return this.dateService.getDayOfWeek(day);
  }
  checkWeekend(day: number): boolean {
    return day === 0 || day === 6;
  }
  defineDay(day: number, month: number) {
    return this.dateService.defineDay(day, month);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
