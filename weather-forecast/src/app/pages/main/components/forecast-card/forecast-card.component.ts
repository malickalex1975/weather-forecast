import { Component, HostListener, Input } from '@angular/core';
import {
  BASE_ICON_URL,
  ENDPOINT_ICON,
  IPlace,
  IWeather,
} from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { WindService } from 'src/app/core/services/wind.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent {
  @Input() weather?: IWeather;
  @Input() day=[]
  constructor(
    private colorService: ColorService,
    private windService: WindService,
    private popupService: PopupService
  ) {}
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
 
  getColor(temp: number) {
    return this.colorService.getColorByTemp(temp);
  }
  defineWind(deg: number) {
    return this.windService.getWind(deg);
  }
  getMore(){
    this.popupService.setData(this.weather)
    this.popupService.setDay(this.day)
  }
}
