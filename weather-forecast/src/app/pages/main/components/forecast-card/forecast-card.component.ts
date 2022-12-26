import { Component, HostListener, Input } from '@angular/core';
import {
  BASE_ICON_URL,
  ENDPOINT_ICON,
  IPlace,
  IWeather,
} from 'src/app/constants';
import { ColorService } from 'src/app/core/services/color.service';
import { WindService } from 'src/app/core/services/wind.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent {
  @Input() weather?: IWeather;
  isMore = false;
  isWindHovered = false;
  constructor(private colorService: ColorService,  private windService:WindService,) {}
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
  defineWind(deg:number){
    return this.windService.getWind(deg)

  }
}
