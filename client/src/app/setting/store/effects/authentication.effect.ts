import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AccountService } from "src/app/core/services/account/account.service";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/account/user";
import { Account } from "src/app/interfaces/account/account";
import { mergeMap, map, tap } from "rxjs/operators";
import {
  AuthenticationActions,
  AuthenticationActionTypes,
  GetAccountsSuccess,
  UpdateUserSuccess,
  ActiveAccountSuccess,
  DeleteUserSuccess,
  DeleteAccountSuccess,
  UpdateAccount,
  GetAccounts,
  ActiveAccount,
  DeleteAccount,
  GetUsers,
  UpdateUser,
  GetUsersSuccess,
  UpdateAccountSuccess,
  DeleteUser,
} from "../actions";

@Injectable()
export class AccountEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly accountService: AccountService
  ) {}

  @Effect()
  public getAccounts$: Observable<Action> = this.actions$.pipe(
    ofType<GetAccounts>(AuthenticationActionTypes.GetAccounts),
    mergeMap(() => this.accountService.getAccounts()),
    handleGetAccounts()
  );

  @Effect()
  public updateAccount$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateAccount>(AuthenticationActionTypes.UpdateAccount),
    mergeMap((action) =>
      this.accountService.updateAccount(action.payload.account)
    ),
    handleUpdateAccount()
  );

  @Effect()
  public activeAccount$: Observable<Action> = this.actions$.pipe(
    ofType<ActiveAccount>(AuthenticationActionTypes.ActiveAccount),
    mergeMap((action) =>
      this.accountService.activeAccount(action.payload.account)
    ),
    handleActiveAccount()
  );

  @Effect()
  public deleteAccount$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteAccount>(AuthenticationActionTypes.DeleteAccount),
    mergeMap((action) =>
      this.accountService.deleteAccount(action.payload.account)
    ),
    handleDeleteAccount()
  );

  @Effect()
  public getUsers$: Observable<Action> = this.actions$.pipe(
    ofType<GetUsers>(AuthenticationActionTypes.GetUsers),
    mergeMap(() => this.accountService.getUsers()),
    handleGetUsers()
  );

  @Effect()
  public updateUser$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateUser>(AuthenticationActionTypes.UpdateUser),
    mergeMap((action) => this.accountService.updateUser(action.payload.user)),
    handleUpdateUser()
  );

  @Effect()
  public deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteUser>(AuthenticationActionTypes.DeleteUser),
    mergeMap((action) => this.accountService.deleteUser(action.payload.user)),
    handleDeleteUser()
  );
}

const handleGetAccounts = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      return new GetAccountsSuccess({
        loading: false,
        accounts: response,
      });
    })
  );

const handleUpdateAccount = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      if (response) {
        return new UpdateAccountSuccess({
          loading: false,
        });
      }
    })
  );

const handleActiveAccount = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      if (response) {
        return new ActiveAccountSuccess({
          loading: false,
        });
      }
    })
  );

const handleDeleteAccount = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      if (response) {
        return new DeleteAccountSuccess({
          loading: false,
        });
      }
    })
  );

const handleGetUsers = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let users = response.map((user) => {
        return {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        };
      });

      return new GetUsersSuccess({
        loading: false,
        users: users,
      });
    })
  );

const handleUpdateUser = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      if (response) {
        return new UpdateUserSuccess({
          loading: false,
        });
      }
    })
  );

const handleDeleteUser = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      if (response) {
        return new DeleteUserSuccess({
          loading: false,
        });
      }
    })
  );
