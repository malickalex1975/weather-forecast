import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MainComponent } from './main.component';
const childRoutes:Routes=[{path:'forecast/:lat/:lon',component:WeatherForecastComponent}]
const routes: Routes = [
  { path: '', component: MainComponent },
  {path:'', component: MainComponent, children:childRoutes},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
