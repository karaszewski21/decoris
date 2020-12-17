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

@Injectable()
export class AccountEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly accountService: AccountService
  ) {}

  @Effect()
  public loginUser$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAccount>(AccountActionTypes.Login),
    mergeMap((action) => this.accountService.login(action.payload.account)),
    handleLoginAccount()
  );

  @Effect()
  public registerAccount$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAccount>(AccountActionTypes.Register),
    tap((log) => console.log(log)),
    mergeMap((action) =>
      this.accountService.register(action.payload.account, action.payload.user)
    ),
    handleRegisterAccount()
  );
}

const handleLoginAccount = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let account: Account;
      let user: User;

      let { id, login, password, token } = response;

      account = { id: id, login: login, password: password, active: false };
      user = {
        id: response["user.id"],
        firstName: response["user.first_name"],
        lastName: response["user.last_name"],
        email: response["user.email"],
        token: token,
      };
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
        active: false,
      };

      return new RegisterAccountSuccess({
        loading: false,
        account: account,
      });
    })
  );
