import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private router: Router, private http: HttpClient) {}

  login(username, password) {
    // localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    // localStorage.removeItem("user");
    this.router.navigate(["/account/login"]);
  }

  isAuthenticated() {
    return false;
  }
}
