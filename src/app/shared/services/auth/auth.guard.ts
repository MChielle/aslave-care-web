import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Constants } from '../../../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authentication = localStorage.getItem(Constants.TOKEN);
    if (authentication) {
      return true;
    }

    this.router.navigate(['signin'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

