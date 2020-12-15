import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { ParametersClientService } from "../../core/services/parameters/client/parameters-client.service";

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
  PositionEmployee,
} from "../../interfaces/client";
import {
  GetParameters,
  ParametersActionTypes,
  GetCitiesByCountry,
  AddParameter,
  RemoveParameter,
  GetParametersSuccess,
  GetCitiesByCountrySuccess,
  AddParameterSuccess,
  RemoveParameterSuccess,
} from "..";

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

  @Effect()
  public addClientParameter$: Observable<Action> = this.actions$.pipe(
    ofType<AddParameter>(ParametersActionTypes.AddParameter),
    mergeMap((action) =>
      this.parametersClientService.addClientParameter(action.payload.parameter)
    ),
    handleAddedClientParameter()
  );

  @Effect()
  public removeClientParameter$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveParameter>(ParametersActionTypes.RemoveParameter),
    mergeMap((action) =>
      this.parametersClientService.removeClientParameter(
        action.payload.parameter
      )
    ),
    handleRemovedClientParameter()
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
        positionEmployees: positionEmployeesList,
      } = response;

      let cities: City[] = [];
      let voivodeships: Voivodeship[] = voivodeshipsList;
      let countries: Country[] = countriesList;
      let businessProfiles: BusinessProfile[] = businessProfilesList;
      let aluminiumProfiles: AluminiumProfile[] = aluminiumProfilesList;
      let aluminiumFittings: AluminiumFitting[] = aluminiumFittingsList;
      let pcvProfiles: PcvProfile[] = pcvProfilesList;
      let pcvFittings: PcvFitting[] = pcvFittingsList;
      let positionEmployees: PositionEmployee[] = positionEmployeesList;

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
        positionEmployees,
      });
    })
  );

const handleSelectedCitiesByCompany = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      let cities: City[] = response.map((value) => {
        return {
          id: value.id,
          name: value.name,
          voivodeship: value.voivodeship,
        };
      });
      return new GetCitiesByCountrySuccess({ loading: false, cities });
    })
  );

const handleAddedClientParameter = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      return new AddParameterSuccess({ loading: false, parameter: response });
    })
  );

const handleRemovedClientParameter = () => (source: Observable<any>) =>
  source.pipe(
    map((response) => {
      return new RemoveParameterSuccess({
        loading: false,
        parameter: response,
      });
    })
  );
