import { Injectable } from '@angular/core';
import { IPollution, PollutionType, POLLUTION_MAX } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  descriptions = [
    'Excellent',
    'Good',
    'Lightly Polluted',
    'Moderately Polluted',
    'Heavily Polluted',
  ];
  colors = ['#0f0', '#0a0', '#ff0', '#fc0', '#f00'];
  constructor() {}

  getPollutionDescription(level: number) {
    return this.descriptions[level - 1];
  }
  getPollutionColor(level: number) {
    return this.colors[level - 1];
  }
  getCOPercent(level: number) {
    let percent = level / POLLUTION_MAX.CO;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getNOPercent(level: number) {
    let percent = level / POLLUTION_MAX.NO;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getNO2Percent(level: number) {
    let percent = level / POLLUTION_MAX.NO2;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getO3Percent(level: number) {
    let percent = level / POLLUTION_MAX.O3;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getSO2Percent(level: number) {
    let percent = level / POLLUTION_MAX.SO2;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getPM2_5Percent(level: number) {
    let percent = level / POLLUTION_MAX.PM2_5;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getPM10Percent(level: number) {
    let percent = level / POLLUTION_MAX.PM10;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }
  getHN3Percent(level: number) {
    let percent = level / POLLUTION_MAX.NH3;
    if (percent > 1) {
      percent = 1;
    }
    return percent;
  }

  getHighLevel(forecast: IPollution, index: PollutionType) {
    let arr: number[] = [];
    forecast.list.forEach((item: any) =>
      arr.push(item?.components?.[index.toLowerCase()])
    );
    return Math.max(...arr);
  }
  getLowLevel(forecast: IPollution, index: PollutionType) {
    let arr: number[] = [];
    forecast.list.forEach((item: any) =>
      arr.push(item?.components?.[index.toLowerCase()])
    );
    return Math.min(...arr);
  }
  getCoeff(forecast: IPollution, index: PollutionType) {
    let highLevel = this.getHighLevel(forecast, index);
    return 100 / highLevel;
  }
  getDiagramColor(value: number, index: PollutionType) {
    let level = Math.round(4 * (value / POLLUTION_MAX[index]));
    if (level > 4) {
      level = 4;
    }
    return this.colors[level]
  }
}
