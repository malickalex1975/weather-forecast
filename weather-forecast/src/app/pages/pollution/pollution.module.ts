import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionRoutingModule } from './pollution-routing.module';
import { PollutionComponent } from './pollution.component';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MainModule } from '../main/main.module';



@NgModule({
  declarations: [
    PollutionComponent
  ],
  imports: [
    CommonModule,
    PollutionRoutingModule,
    LetModule,
    TranslateModule,
    MaterialModule,
    MainModule
    
    
  ]
})
export class PollutionModule { }
