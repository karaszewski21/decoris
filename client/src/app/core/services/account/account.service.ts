import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "../../../interfaces/account/user";
import { environment } from "../../../../environments/environment";
import { Account } from "src/app/interfaces/account/account";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  keyStorage = "user_decoris";

  constructor(private router: Router, private http: HttpClient) {}

  login(account: Account): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}account/login`, account);
  }

  logout() {
    localStorage.removeItem(this.keyStorage);
    this.router.navigate(["/account"]);
  }

  register(account: Account, user: User) {
    return this.http.post(`${environment.apiUrl}account/register`, {
      account,
      user,
    });
  }

  getUserFromLocalStorage() {
    let user = localStorage.getItem(this.keyStorage);
    return JSON.parse(user);
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem(this.keyStorage, JSON.stringify(user));
  }
}
