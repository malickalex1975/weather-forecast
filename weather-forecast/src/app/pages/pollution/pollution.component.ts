import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  }

getDescription(level:number){
  return this.pollutionService.getPollutionDescription(level)
}
getStyle(level:number){
  return `background-color: ${this.pollutionService.getPollutionColor(level)}`
}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
