import * as fromParameters from "./parametersReducer";
import * as fromAccount from "./accountReducer";

export interface State {
  parameters: fromParameters.State;
  account: fromAccount.State;
}

export const reducers = {
  parameters: fromParameters.parametersReducer,
  account: fromAccount.accountReducer,
};
