import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from './core/guards/app-guard.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { OscillatorComponent } from './pages/camera-game/oscillator/oscillator.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
      canActivate:[AppGuardGuard]
  },
  {
    path: 'pollution/:lat/:lon/:place',
    loadChildren: () =>
      import('./pages/pollution/pollution.module').then((m) => m.PollutionModule),
      canActivate:[AppGuardGuard]
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('./pages/camera-game/camera-game.module').then((m) => m.CameraGameModule),
      canActivate:[]
     
  },
  {
    path: 'oscillator',
    component:OscillatorComponent,
      
     
  },
  {
    path: 'login/:url',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
     
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
     
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AppGuardGuard, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule],
})
export class AppRoutingModule {}
