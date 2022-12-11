import { Pipe, PipeTransform } from '@angular/core';
import { IWeather } from 'src/app/constants';

@Pipe({
  name: 'chooseDate'
})
export class ChooseDatePipe implements PipeTransform {

  transform(value: IWeather[], date: number): IWeather[]{
    let out=value.filter(i=>new Date((i.dt!)*1000).getDate()===date)
    
    return out
  
  }
}
