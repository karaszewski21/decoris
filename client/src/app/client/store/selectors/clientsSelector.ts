import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ClientState, CLIENT_KEY } from "../reducers";

export const getClientsState = createFeatureSelector<ClientState>(CLIENT_KEY);

export const getClients = createSelector(
  getClientsState,
  (state) => state.client.clients
);

export const getCountClients = createSelector(
  getClientsState,
  (state) => state.client.count
);

export const getClientsLoading = createSelector(
  getClientsState,
  (state) => state.client.loading
);
