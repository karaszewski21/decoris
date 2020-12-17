import * as fromAuthentication from "./authentication.reducer";
import * as fromRoot from "../../../store/reducers";

export const Authentication_KEY = "authentication-authorization";

export interface AuthenticationState {
  authentication: fromAuthentication.State;
}

export interface State extends fromRoot.State {
  authentication: AuthenticationState;
}

export const reducers = {
  authentication: fromAuthentication.authenticationReducer,
};
