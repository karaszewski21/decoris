import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ClientsState } from "../reducers";

export const getClientsState = createFeatureSelector<ClientsState>(
  "clientsState"
);

export const getClients = createSelector(
  getClientsState,
  (state) => state.clients
);
