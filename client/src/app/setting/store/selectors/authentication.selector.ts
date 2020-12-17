import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Authentication_KEY, AuthenticationState } from "../reducers";

export const getAuthenticationState = createFeatureSelector<
  AuthenticationState
>(Authentication_KEY);

export const getAccounts = createSelector(
  getAuthenticationState,
  (state) => state.authentication.accounts
);

export const getUsers = createSelector(
  getAuthenticationState,
  (state) => state.authentication.users
);

export const getAuthenticationLoading = createSelector(
  getAuthenticationState,
  (state) => state.authentication.loading
);
