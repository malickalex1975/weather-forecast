import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeather, LANG } from 'src/app/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateArray$$ = new BehaviorSubject<any[]>([]);
  monthEN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  monthRU = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  weekEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  weekRu = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  nowDay = new Date().getDate();
  nowMonth = new Date().getMonth();
  constructor(private storage: StorageService) {}

  createDateArray(list: IWeather[]) {
    let out: any[] = [];
    list
      .map((i) => new Date(i.dt! * 1000))
      .map((i) => [i.getDay(), i.getDate(), i.getMonth()])
      .forEach((i) => {
        if (
          !out.some(
            (item) => item[0] === i[0] && item[1] === i[1] && item[2] === i[2]
          )
        ) {
          out.push(i);
        }
      });

    this.dateArray$$.next(out);
  }
  emitDateArray() {
    return this.dateArray$$;
  }
  getMonthByNumber(month: number) {
    return this.storage.getItem(LANG) === 'ru'
      ? this.monthRU[month]
      : this.monthEN[month];
  }
  getDayOfWeek(day: number) {
    return this.storage.getItem(LANG) === 'ru'
      ? this.weekRu[day]
      : this.weekEn[day];
  }
  defineDay(day: number, month: number) {
    let lang = this.storage.getItem(LANG);
    if (lang === 'ru') {
      return this.nowDay === day && this.nowMonth === month
        ? 'Сегодня'
        : this.nowDay === day - 1 && this.nowMonth === month
        ? 'Завтра'
        : '';
    }
    if (lang === 'en') {
      return this.nowDay === day && this.nowMonth === month
        ? 'Today'
        : this.nowDay === day - 1 && this.nowMonth === month
        ? 'Tomorrow'
        : '';
    }
    return '';
  }
}
