import { Action } from "@ngrx/store";
import { Account } from "src/app/interfaces/account/account";
import { User } from "src/app/interfaces/account/user";

export enum AccountActionTypes {
  Login = "[Account] login user",
  LoginSuccess = "[Account] login user is successfully",
  Logout = "[Account] logout user",
  Register = " [Account] register user",
  RegisterSuccess = " [Account] register user is successfully",
}

export class LoginAccount implements Action {
  readonly type = AccountActionTypes.Login;
  constructor(
    public readonly payload: { loading: boolean; account: Account }
  ) {}
}

export class LoginAccountSuccess implements Action {
  readonly type = AccountActionTypes.LoginSuccess;
  constructor(
    public readonly payload: { loading: boolean; account: Account; user: User }
  ) {}
}

export class RegisterAccount implements Action {
  readonly type = AccountActionTypes.Register;
  constructor(
    public readonly payload: { loading: boolean; account: Account; user: User }
  ) {}
}

export class RegisterAccountSuccess implements Action {
  readonly type = AccountActionTypes.RegisterSuccess;
  constructor(
    public readonly payload: { loading: boolean; account: Account }
  ) {}
}

export class LogoutAccount implements Action {
  readonly type = AccountActionTypes.Logout;
  constructor(public readonly payload: { logout: boolean }) {}
}

export type AccountActions =
  | LoginAccount
  | LoginAccountSuccess
  | RegisterAccount
  | RegisterAccountSuccess
  | LogoutAccount;
