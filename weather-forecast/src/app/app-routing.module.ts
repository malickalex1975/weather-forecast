import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from './core/guards/app-guard.guard';

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
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
     
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AppGuardGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule],
})
export class AppRoutingModule {}
