import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ClientsState } from "../reducers";

export const getClientsState = createFeatureSelector<any>("client");

export const getClients = createSelector(
  getClientsState,
  (state) => state.clientsReducer.clients
);

export const getCountClients = createSelector(
  getClientsState,
  (state) => state.clientsReducer.count
);

export const getClientsLoading = createSelector(
  getClientsState,
  (state) => state.clientsReducer.loading
);
