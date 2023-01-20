import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraGameComponent } from './camera-game.component';
import { OscillatorComponent } from './oscillator/oscillator.component';


const routes: Routes = [
  { path: '', component: CameraGameComponent,  },
 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule],
})
export class CameraGameRoutingModule {}
