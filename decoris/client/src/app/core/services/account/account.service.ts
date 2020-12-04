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
  username = "karas";
  passowrd = "1234";
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
    if (this.username == username && this.passowrd == password) {
      this.userSubject.next({
        id: "xcx",
        firstName: "asa",
        lastName: "lastName",
        email: "test",
        token: "token",
      });
      this.router.navigate(["/client"]);
    } else {
      this.router.navigate(["/account"]);
    }
    // return this.http
    //   .post<User>(`${environment.apiUrl}/account/login`, {
    //     username,
    //     password,
    //   })
    //   .pipe(
    //     map((user) => {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem("user", JSON.stringify(user));
    //       this.userSubject.next({
    //         id: "xcx",
    //         firstName: "asa",
    //         lastName: "lastName",
    //         email: "test",
    //         token: "token",
    //       });
    //       return user;
    //     })
    //   );
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
