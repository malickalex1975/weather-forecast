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

@NgModule({
  declarations: [MainComponent, NotFoundComponent, LastPlacesComponent, ForecastCardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    SharedModule,
    LetModule,
    TranslateModule
    
    
  ]
})
export class MainModule { }
