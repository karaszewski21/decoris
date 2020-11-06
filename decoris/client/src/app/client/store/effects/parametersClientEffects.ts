import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
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
  public getClientParameters$: Observable<Action> = this.actions$.pipe(
    ofType<GetParameters>(ParametersActionTypes.GetParameters),
    mergeMap(() => this.parametersClientService.getParameters()),
    handleParametersClient()
  );

  @Effect()
  public getCitiesByCompanyId$: Observable<Action> = this.actions$.pipe(
    ofType<GetCitiesByCountry>(ParametersActionTypes.GetCitiesByCountry),
    mergeMap((action) =>
      this.parametersClientService.getCitiesByCountryId(
        action.payload.countriesIds
      )
    ),
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
      console.log(response);
      let cities: City[] = response.map((value) => {
        return {
          id: value.id,
          name: value.name,
          voivodeship: value.voivodeship,
        };
      });

      console.log(cities);

      return new GetCitiesByCountrySuccess({ loading: false, cities });
    })
  );
