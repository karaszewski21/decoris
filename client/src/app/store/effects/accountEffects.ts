import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { AccountService } from "src/app/core/services/account/account.service";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  LoginAccount,
  AccountActionTypes,
  LoginAccountSuccess,
  RegisterAccount,
  RegisterAccountSuccess,
} from "../actions";
import { mergeMap, map, tap } from "rxjs/operators";
import { Account } from "src/app/interfaces/account/account";
import { User } from "src/app/interfaces/account/user";
import { Router } from "@angular/router";

@Injectable()
export class AccountEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly accountService: AccountService,
    private router: Router
  ) {}

  @Effect()
  public loginUser$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAccount>(AccountActionTypes.Login),
    mergeMap((action) => this.accountService.login(action.payload.account)),
    handleLoginAccount(this.accountService, this.router)
  );

  @Effect()
  public registerAccount$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAccount>(AccountActionTypes.Register),
    mergeMap((action) =>
      this.accountService.register(action.payload.account, action.payload.user)
    ),
    handleRegisterAccount()
  );
}

const handleLoginAccount = (accountService: AccountService, router: Router) => (
  source: Observable<any>
) =>
  source.pipe(
    map((response) => {
      let account: Account;
      let user: User;

      let { id, login, password, token } = response;

      account = { id: id, login: login, password: password, active: 0 };
      user = {
        id: response["user.id"],
        firstName: response["user.first_name"],
        lastName: response["user.last_name"],
        email: response["user.email"],
        token: token,
      };

      accountService.setUserToLocalStorage(user);
      router.navigate(["/client"]);

      return new LoginAccountSuccess({
        loading: false,
        account: account,
        user: user,
      });
    })
  );

const handleRegisterAccount = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let account: Account;
      let { id, login } = response;

      account = {
        id: id,
        login: login,
        password: "",
        active: 0,
      };

      return new RegisterAccountSuccess({
        loading: false,
        account: account,
      });
    })
  );
