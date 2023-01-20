import { Component, Input, OnInit } from '@angular/core';
import { PollutionType } from 'src/app/constants';
import { DateService } from 'src/app/core/services/date.service';
import { PollutionService } from 'src/app/core/services/pollution.service';

@Component({
  selector: 'app-pollution-forecast-element',
  templateUrl: './pollution-forecast-element.component.html',
  styleUrls: ['./pollution-forecast-element.component.scss'],
})
export class PollutionForecastElementComponent implements OnInit {
  @Input() forecast: any;
  @Input() index?: PollutionType;
  forecastDays$$ = this.dateService.emitDateArray();
  hovered = null;
  constructor(
    private dateService: DateService,
    private pollutionService: PollutionService
  ) {}
  ngOnInit(): void {
   
    this.dateService.createDateArray(this.forecast.list);
    setTimeout(() => {
      let days = document.querySelectorAll('.day') as NodeListOf<HTMLElement>;
      if (days) {
        days.forEach((day) => this.toggleFullscreen(day));
      }
    }, 3000);
  
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
  getElementStyle = (value: number, index: PollutionType) => {
    let coeff = this.pollutionService.getCoeff(this.forecast, index);

    let color = this.pollutionService.getDiagramColor(value, index);
    return `height: ${value * coeff}px; background-color: ${color};  &:hover {
      background-color: #aaa;
    }`;
  };

  getTime(time: number) {
    return new Date(time * 1000).getHours().toString() + ':00';
  }

  toggleFullscreen(el: HTMLElement) {
    el.addEventListener('dblclick', () => {
      console.log('dblclicked');
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch((err) => console.log(err));
      }
    });
  }
}
