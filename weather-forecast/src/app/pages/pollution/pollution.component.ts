import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IPollution, PollutionType } from 'src/app/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { PollutionService } from 'src/app/core/services/pollution.service';

@Component({
  selector: 'app-pollution',
  templateUrl: './pollution.component.html',
  styleUrls: ['./pollution.component.scss'],
})
export class PollutionComponent implements OnInit {
  lat?: number;
  lon?: number;
  place = '';
  pollution$?: Observable<any>;
  pollutionForecast$?: Observable<any>;
  subscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private pollutionService: PollutionService
  ) {}
  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.lat = params['lat'];
      this.lon = params['lon'];
      this.place = params['place'];
    });
    this.pollution$ = this.http.getCurrentPollution(this.lat, this.lon);
    this.pollutionForecast$ = this.http.getPollutionForecast(this.lat, this.lon);
  }

  getDescription(level: number) {
    return this.pollutionService.getPollutionDescription(level);
  }
  getStyle(level: number) {
    return `background-color: ${this.pollutionService.getPollutionColor(
      level
    )}`;
  }

  getCOStyle(level: number) {
    let percent = this.pollutionService.getCOPercent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getNOStyle(level: number) {
    let percent = this.pollutionService.getNOPercent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getNO2Style(level: number) {
    let percent = this.pollutionService.getNO2Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getO3Style(level: number) {
    let percent = this.pollutionService.getO3Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getSO2Style(level: number) {
    let percent = this.pollutionService.getSO2Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getPM2_5Style(level: number) {
    let percent = this.pollutionService.getPM2_5Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getPM10Style(level: number) {
    let percent = this.pollutionService.getPM10Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getHN3Style(level: number) {
    let percent = this.pollutionService.getHN3Percent(level);
    let leftPoint = 150 * percent - 7;
    return `left: ${leftPoint}px`;
  }
  getHighLevel(forecast:IPollution,index:PollutionType){
return this.pollutionService.getHighLevel(forecast,index)
  }
  getLowLevel(forecast:IPollution,index:PollutionType){
return this.pollutionService.getLowLevel(forecast,index)
  }
  getCoeff(forecast:IPollution,index:PollutionType){
return this.pollutionService.getCoeff(forecast,index)
  }
  getHighLevelPosition(forecast:IPollution,index:PollutionType){
    return `margin-top: ${-47-this.getHighLevel(forecast,index)*this.getCoeff(forecast,index)}px`
  }
  getLowLevelPosition(forecast:IPollution,index:PollutionType){
    return `margin-top: ${-66-this.getLowLevel(forecast,index)*this.getCoeff(forecast,index)}px`
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
