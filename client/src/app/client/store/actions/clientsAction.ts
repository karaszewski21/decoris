import { Action } from "@ngrx/store";
import { Company } from "../../../interfaces/client/company";
import { Filter } from "../../../interfaces/client/filter";

export enum ClientsActionTypes {
  GetClients = "get company list [Company]",
  GetClientsSuccess = "get company list is successfully [Company]",
  ExportClients = "export company list [Company]",
  ExportClientsSuccess = "export company list is successfully [Company]",
}

export class GetClients implements Action {
  readonly type = ClientsActionTypes.GetClients;
  constructor(public readonly payload: any) {}
}

export class GetClientsSuccess implements Action {
  readonly type = ClientsActionTypes.GetClientsSuccess;
  constructor(
    public readonly payload: {
      loading: boolean;
      companies: Company[];
      count: number;
    }
  ) {}
}

export class ExportClients implements Action {
  readonly type = ClientsActionTypes.ExportClients;
  constructor(public readonly payload: { loading: boolean; type: string }) {}
}

export class ExportClientsSuccess implements Action {
  readonly type = ClientsActionTypes.ExportClientsSuccess;
  constructor(public readonly payload: { loading: boolean }) {}
}

export type ClientsActions =
  | GetClients
  | GetClientsSuccess
  | ExportClients
  | ExportClientsSuccess;
