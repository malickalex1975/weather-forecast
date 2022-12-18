import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StartService } from '../services/start.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuardGuard implements CanActivate {
  constructor(private startService: StartService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.startService.getStarted()) {
      return true;
    } else {
      return this.router.parseUrl('/start');
      
    }
  }
}
