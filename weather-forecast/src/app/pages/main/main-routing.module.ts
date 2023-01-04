import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from 'src/app/core/guards/app-guard.guard';
import { AboutComponent } from '../about/about.component';
import { DenyPageComponent } from '../deny-page/deny-page.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StartPageComponent } from '../start-page/start-page.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MainComponent } from './main.component';
const childRoutes: Routes = [
  {
    path: 'forecast/:lat/:lon',
    component: WeatherForecastComponent,
    canActivate: [AppGuardGuard],
  },
];
const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AppGuardGuard] },
  {
    path: '',
    component: MainComponent,
    children: childRoutes,
    canActivate: [AppGuardGuard],
  },
  { path: 'start', component: StartPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'access_denied', component: DenyPageComponent },
  { path: '**', component: NotFoundComponent, canActivate: [AppGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AppGuardGuard],
  exports: [RouterModule],
})
export class MainRoutingModule {}
