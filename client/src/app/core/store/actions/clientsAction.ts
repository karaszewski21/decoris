import { Action } from "@ngrx/store";
import { Company } from "../../../interfaces/client/company";

export enum ClientsActionTypes {
  GetClients = "get company list [Company]",
  GetClientsSuccess = "get company list is successfully [Company]",
}

export class GetClients implements Action {
  readonly type = ClientsActionTypes.GetClients;
  constructor(public readonly payload: { loading: boolean }) {}
}

export class GetClientsSuccess implements Action {
  readonly type = ClientsActionTypes.GetClientsSuccess;
  constructor(
    public readonly payload: {
      loading: boolean;
      companies: Company[];
    }
  ) {}
}

export type ClientsActions = GetClients | GetClientsSuccess;
