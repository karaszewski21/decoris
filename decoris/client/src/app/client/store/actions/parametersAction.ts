import { Action } from "@ngrx/store";
import { Company } from "../../../interfaces/client/company";
import {
  BusinessProfile,
  City,
  Voivodeship,
  Country,
  AluminiumProfile,
  PcvProfile,
  AluminiumFitting,
  PcvFitting,
  PositionEmployee,
} from "../../../interfaces/client";

export enum ParametersActionTypes {
  GetParameters = "get parametrs: cities, voivodeships, countries, business profiles [Parametr]",
  GetParametersSuccess = "get parametrs cities, voivodeships, countries, business profiles is successfully [Parametr]",
  GetCitiesByCountry = "get cities by country [Parametr]",
  GetCitiesByCountrySuccess = "get cities by country is successfully [Parametr]",
}

export class GetParameters implements Action {
  readonly type = ParametersActionTypes.GetParameters;
  constructor(public readonly payload: { loading: true }) {}
}

export class GetParametersSuccess implements Action {
  readonly type = ParametersActionTypes.GetParametersSuccess;
  constructor(
    public readonly payload: {
      businessProfiles: BusinessProfile[];
      cities: City[];
      voivodeships: Voivodeship[];
      countries: Country[];
      aluminiumProfiles: AluminiumProfile[];
      pcvProfiles: PcvProfile[];
      aluminiumFittings: AluminiumFitting[];
      pcvFittings: PcvFitting[];
      positionEmployees: PositionEmployee[];
      loading: false;
    }
  ) {}
}

export class GetCitiesByCountry implements Action {
  readonly type = ParametersActionTypes.GetCitiesByCountry;
  constructor(
    public readonly payload: { loading: true; countriesIds: number[] }
  ) {}
}

export class GetCitiesByCountrySuccess implements Action {
  readonly type = ParametersActionTypes.GetCitiesByCountrySuccess;
  constructor(
    public readonly payload: {
      loading: boolean;
      cities: City[];
    }
  ) {}
}

export type ParametersActions =
  | GetParameters
  | GetParametersSuccess
  | GetCitiesByCountry
  | GetCitiesByCountrySuccess;
