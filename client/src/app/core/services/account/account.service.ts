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

  checkLogin(login) {
    return this.http.get<boolean>(
      `${environment.apiUrl}account/login/${login}`
    );
  }

  getAccounts() {
    return this.http.get(`${environment.apiUrl}account/get-accounts`);
  }

  updateAccount(account: Account) {
    return this.http.put<boolean>(
      `${environment.apiUrl}account/update-account`,
      account
    );
  }

  deleteAccount(account: Account) {
    return this.http.delete<boolean>(
      `${environment.apiUrl}account/delete-account/${account.id}`
    );
  }

  activeAccount(account: Account) {
    return this.http.put<boolean>(
      `${environment.apiUrl}account/active`,
      account
    );
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}account/get-users`);
  }

  updateUser(user: User) {
    return this.http.put<boolean>(`${environment.apiUrl}account/update-user`, {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    });
  }

  deleteUser(user: User) {
    return this.http.delete<boolean>(
      `${environment.apiUrl}account/delete-user/${user.id}`
    );
  }
}
