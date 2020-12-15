import { ActionReducerMap } from "@ngrx/store";
import * as fromClients from "./clientsReducer";
import * as fromRoot from "../../../store/reducers";
export const CLIENT_KEY = "client";

export interface ClientState {
  client: fromClients.State;
}

export interface State extends fromRoot.State {
  client: ClientState;
}

export const reducers = { client: fromClients.clientsReducer };
