import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  GetClientsSuccess,
  ClientsActions,
  ClientsActionTypes,
  ExportClientsSuccess,
} from "../actions/clientsAction";

import { saveAs } from "file-saver";

import { ClientService } from "../../../core/services/client/client.service";
@Injectable()
export class ClientEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly clienctService: ClientService
  ) {}

  @Effect()
  getClientsByParametrs$: Observable<Action> = this.actions$.pipe(
    ofType<ClientsActions>(ClientsActionTypes.GetClients),
    switchMap((action) =>
      this.clienctService.getClients(action.payload.filter)
    ),
    handleGetClients()
  );

  @Effect()
  exportClients$: Observable<Action> = this.actions$.pipe(
    ofType<ClientsActions>(ClientsActionTypes.ExportClients),
    switchMap((action) =>
      this.clienctService.exportClients(action.payload.type)
    ),
    handleExportClients()
  );
}
const handleGetClients = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      console.log(response);
      let { count, companies } = response;
      return new GetClientsSuccess({
        loading: false,
        companies: companies,
        count: count,
      });
    })
  );

const handleExportClients = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      saveAs(response, `clients-${Date.now()}.csv`);
      return new ExportClientsSuccess({
        loading: false,
      });
    })
  );
