import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromAccount from "../reducers/accountReducer";

export const getAccountState = createFeatureSelector<fromAccount.State>(
  "account"
);

export const getAccount = createSelector(
  getAccountState,
  (state) => state.account
);

export const getUser = createSelector(getAccountState, (state) => state.user);

export const getLoadingAccount = createSelector(
  getAccountState,
  (state) => state.loading
);
