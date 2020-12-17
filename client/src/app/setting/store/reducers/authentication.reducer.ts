import { User } from "src/app/interfaces/account/user";
import { Account } from "src/app/interfaces/account/account";
import { AuthenticationActions, AuthenticationActionTypes } from "..";

export interface State {
  loading: boolean;
  accounts: Account[];
  users: User[];
}

export const initialState: State = {
  loading: false,
  accounts: [],
  users: [],
};

export function authenticationReducer(
  state = initialState,
  action: AuthenticationActions
) {
  switch (action.type) {
    case AuthenticationActionTypes.GetAccounts: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.GetAccountsSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
        accounts: action.payload.accounts,
      };
    }

    case AuthenticationActionTypes.UpdateAccount: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.UpdateAccountSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.ActiveAccount: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.ActiveAccountSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.DeleteAccount: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.DeleteAccountSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.GetUsers: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.GetUsersSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
        users: action.payload.users,
      };
    }

    case AuthenticationActionTypes.UpdateUser: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.UpdateUserSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.DeleteUser: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case AuthenticationActionTypes.DeleteUserSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    default: {
      return state;
    }
  }
}
