import { Action } from "@ngrx/store";
import { Account } from "src/app/interfaces/account/account";
import { User } from "src/app/interfaces/account/user";

export enum AuthenticationActionTypes {
  GetAccounts = "[Account] get account list",
  GetAccountsSuccess = "[Account] get account list is successfully",
  UpdateAccount = "[Account] update account",
  UpdateAccountSuccess = "[Account] update account is successfully",
  DeleteAccount = "[Account] delete account",
  DeleteAccountSuccess = "[Account] delete account is successfully",
  ActiveAccount = "[Account] active account",
  ActiveAccountSuccess = "[Account] active account is successfully",

  GetUsers = "[User] get user list",
  GetUsersSuccess = "[User] get user list is successfully",
  UpdateUser = "[User] update user",
  UpdateUserSuccess = "[User] update user is successfully",
  DeleteUser = "[User] delete user",
  DeleteUserSuccess = "[User] delete user is successfully",
}

export class GetAccounts implements Action {
  readonly type = AuthenticationActionTypes.GetAccounts;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class GetAccountsSuccess implements Action {
  readonly type = AuthenticationActionTypes.GetAccountsSuccess;
  constructor(
    public readonly payload: {
      loading: boolean;
      accounts: Account[];
    }
  ) {}
}

export class UpdateAccount implements Action {
  readonly type = AuthenticationActionTypes.UpdateAccount;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class UpdateAccountSuccess implements Action {
  readonly type = AuthenticationActionTypes.UpdateAccountSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class ActiveAccount implements Action {
  readonly type = AuthenticationActionTypes.ActiveAccount;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class ActiveAccountSuccess implements Action {
  readonly type = AuthenticationActionTypes.ActiveAccountSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class DeleteAccount implements Action {
  readonly type = AuthenticationActionTypes.DeleteAccount;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class DeleteAccountSuccess implements Action {
  readonly type = AuthenticationActionTypes.DeleteAccountSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class GetUsers implements Action {
  readonly type = AuthenticationActionTypes.GetUsers;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class GetUsersSuccess implements Action {
  readonly type = AuthenticationActionTypes.GetUsersSuccess;
  constructor(
    public readonly payload: {
      loading: boolean;
      users: User[];
    }
  ) {}
}

export class UpdateUser implements Action {
  readonly type = AuthenticationActionTypes.UpdateUser;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = AuthenticationActionTypes.UpdateUserSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class DeleteUser implements Action {
  readonly type = AuthenticationActionTypes.DeleteUser;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = AuthenticationActionTypes.DeleteUserSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export type AuthenticationActions =
  | GetAccounts
  | GetAccountsSuccess
  | UpdateAccount
  | UpdateAccountSuccess
  | ActiveAccount
  | ActiveAccountSuccess
  | DeleteAccount
  | DeleteAccountSuccess
  | GetUsers
  | GetUsersSuccess
  | UpdateUser
  | UpdateUserSuccess
  | DeleteUser
  | DeleteUserSuccess;
