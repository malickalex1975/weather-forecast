import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollutionComponent } from './pollution.component';

const routes: Routes = [{path:'',component:PollutionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollutionRoutingModule { }
