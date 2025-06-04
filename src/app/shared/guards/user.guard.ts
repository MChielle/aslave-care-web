import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { UserType } from "../enums/role.enum";

@Injectable({
  providedIn: "root",
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = this.authService.getRole();
    const userType = UserType[role as keyof typeof UserType];
    if (userType == UserType.Master || userType == UserType.Manager)
      return true;

    this.router.navigate(["dashboard"]);
    return false;
  }
}
