import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../../interfaces/account/user";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  currentLogin: string = "";
  currentPassword: string = "";
  username = "karas";
  passowrd = "karas12#$";
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password) {
    if (localStorage.getItem("user")) {
      this.router.navigate(["/client"]);
    }

    if (this.username == username && this.passowrd == password) {
      let user = {
        id: "xcx",
        firstName: "Patryk",
        lastName: "Karaszewski",
        email: "test",
        token: "token",
      };
      this.userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      this.router.navigate(["/client"]);
    } else {
      this.router.navigate(["/account"]);
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate(["/account"]);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/account/register`, user);
  }
}
