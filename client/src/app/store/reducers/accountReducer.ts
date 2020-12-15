import { User } from "src/app/interfaces/account/user";
import { Account } from "src/app/interfaces/account/account";
import { AccountActions, AccountActionTypes } from "../actions";

export interface State {
  loading: boolean;
  account: Account;
  user: User;
}

export const initialState: State = {
  loading: false,
  account: null,
  user: null,
};

export function accountReducer(
  state = initialState,
  action: AccountActions
): State {
  switch (action.type) {
    case AccountActionTypes.LoginSuccess:
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        user: action.payload.user,
      };

    case AccountActionTypes.RegisterSuccess:
      return {
        ...state,
        loading: action.payload.loading,
        account: action.payload.account,
      };

    case AccountActionTypes.Logout:
      return { ...state, account: null, user: null };

    default:
      return state;
  }
}
