import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { ParametersClientService } from "../../../core/services/parameters/client/parameters-client.service";
import {
  GetCitiesByCountry,
  GetCitiesByCountrySuccess,
  GetParameters,
  ParametersActionTypes,
  GetParametersSuccess,
} from "../actions";
import {
  Company,
  BusinessProfile,
  City,
  Voivodeship,
  Country,
  AluminiumProfile,
  PcvProfile,
  AluminiumFitting,
  PcvFitting,
} from "../../../interfaces/client";

@Injectable()
export class ParametersClientEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly parametersClientService: ParametersClientService
  ) {}

  @Effect()
  getClientParameters$: Observable<Action> = this.actions$.pipe(
    ofType<GetParameters>(ParametersActionTypes.GetParametrs),
    switchMap(() => this.parametersClientService.getParameters()),
    tap((value) => console.log(value)),
    handleParametersClient()
  );

  @Effect()
  getCitiesByCompanyId$: Observable<Action> = this.actions$.pipe(
    ofType<GetCitiesByCountry>(ParametersActionTypes.GetCitiesByCountry),
    switchMap((action) =>
      this.parametersClientService.getCitiesByCompanyId(
        action.payload.companyId
      )
    ),
    tap((value) => console.log(value)),
    handleSelectedCitiesByCompany()
  );
}
const handleParametersClient = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let {
        voivodeships: voivodeshipsList,
        countries: countriesList,
        businessProfiles: businessProfilesList,
        aluminiumProfiles: aluminiumProfilesList,
        aluminiumFittings: aluminiumFittingsList,
        pcvProfiles: pcvProfilesList,
        pcvFittings: pcvFittingsList,
      } = response;

      let cities: City[] = [];
      let voivodeships: Voivodeship[] = voivodeshipsList;
      let countries: Country[] = countriesList;
      let businessProfiles: BusinessProfile[] = businessProfilesList;
      let aluminiumProfiles: AluminiumProfile[] = aluminiumProfilesList;
      let aluminiumFittings: AluminiumFitting[] = aluminiumFittingsList;
      let pcvProfiles: PcvProfile[] = pcvProfilesList;
      let pcvFittings: PcvFitting[] = pcvFittingsList;

      return new GetParametersSuccess({
        loading: false,
        businessProfiles,
        cities,
        voivodeships,
        countries,
        aluminiumProfiles,
        pcvProfiles,
        aluminiumFittings,
        pcvFittings,
      });
    })
  );

const handleSelectedCitiesByCompany = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let { cities: citiesList } = response;

      let cities: City[] = citiesList;

      return new GetCitiesByCountrySuccess({ loading: false, cities });
    })
  );
