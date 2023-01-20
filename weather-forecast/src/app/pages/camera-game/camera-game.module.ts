import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraGameComponent } from './camera-game.component';
import { CameraGameRoutingModule } from './camera-game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CameraGameComponent,
    
  ],
  imports: [
    CommonModule,CameraGameRoutingModule,SharedModule
  ]
})
export class CameraGameModule { }
