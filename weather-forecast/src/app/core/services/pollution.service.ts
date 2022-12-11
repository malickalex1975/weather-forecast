import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
descriptions=['Excellent','Good','Lightly Polluted','Moderately Polluted ','Heavily Polluted',]
colors=['#0f0','#0a0','#ff0','#fc0','#f00']
  constructor() { }

  getPollutionDescription(level:number){
    return this.descriptions[level-1]
  }
  getPollutionColor(level:number){
    return this.colors[level-1]
  }
}

