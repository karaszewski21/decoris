import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { SetFilters, FiltersActionTypes } from "../actions/filtersAction";
import { GetClientsSuccess } from "../actions/clientsAction";
import { ClientService } from "../../services/client/client.service";
import { GetParameters, GetCitiesByCountry } from "..";
@Injectable()
export class ClientEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly clienctService: ClientService,
    private store: Store
  ) {}

  @Effect()
  getClientsByParametrs$: Observable<Action> = this.actions$.pipe(
    ofType<SetFilters>(FiltersActionTypes.SetFilters),
    switchMap((action) => this.clienctService.getClients(action.payload)),
    handleClients(this.store)
  );
}
const handleClients = (store: Store) => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let { rows: companies } = response;
      console.log(companies);
      // store.dispatch(new GetParameters({ loading: true }));
      // store.dispatch(
      //   new GetCitiesByCountry({
      //     loading: true,
      //     countriesIds: [companies[0]],
      //   })
      // );
      return new GetClientsSuccess({ loading: false, companies });
    })
  );
