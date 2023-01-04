import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LastPlacesComponent } from './components/last-places/last-places.component';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { PollutionForecastElementComponent } from './components/pollution-forecast-element/pollution-forecast-element.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DeveloperComponent } from './components/developer/developer.component';
import { AboutComponent } from '../about/about.component';
import { PopupComponent } from '../popup/popup.component';
import { DenyPageComponent } from '../deny-page/deny-page.component';

@NgModule({
  declarations: [
    MainComponent,
    NotFoundComponent,
    LastPlacesComponent,
    ForecastCardComponent,
    WeatherForecastComponent,
    PollutionForecastElementComponent,
    DeveloperComponent,
    AboutComponent,
    DenyPageComponent
  
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    SharedModule,
    LetModule,
    TranslateModule,
    MaterialModule,
  ],
  exports: [PollutionForecastElementComponent, MaterialModule],
})
export class MainModule {}
