import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraGameComponent } from './camera-game.component';
import { CameraGameRoutingModule } from './camera-game-routing.module';



@NgModule({
  declarations: [
    CameraGameComponent
  ],
  imports: [
    CommonModule,CameraGameRoutingModule
  ]
})
export class CameraGameModule { }
