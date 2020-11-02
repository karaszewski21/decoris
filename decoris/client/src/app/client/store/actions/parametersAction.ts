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
} from "../../../interfaces/client";

export enum ParametersActionTypes {
  GetParametrs = "get cities, voivodeships, countries, business profiles [Parametr]",
  GetParametrsSuccess = "get parametrs is successfully [Parametr]",
  GetCitiesByCountry = "get cities, voivodeships, countries, business profiles [Parametr]",
  GetCitiesByCountrySuccess = "get cities by country is successfully [Parametr]",
}

export class GetParameters implements Action {
  readonly type = ParametersActionTypes.GetParametrs;
  constructor(public readonly payload: { loading: true }) {}
}

export class GetParametersSuccess implements Action {
  readonly type = ParametersActionTypes.GetParametrsSuccess;
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
      loading: false;
    }
  ) {}
}

export class GetCitiesByCountry implements Action {
  readonly type = ParametersActionTypes.GetCitiesByCountry;
  constructor(public readonly payload: { loading: true; companyId: number }) {}
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
