import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AccountService } from "../../services/account/account.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.getUserFromLocalStorage();
    if (user) {
      return true;
    }
    this.router.navigate(["/account"]);
    return false;
  }
}
