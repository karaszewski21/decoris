import { Action } from "@ngrx/store";
import { Company } from "../../../interfaces/client/company";
import {
  BusinessProfile,
  City,
  Voivodeship,
  Country,
} from "../../../interfaces/client";

export enum FiltersActionTypes {
  SetFilters = "set filters [Filter]",
}

export class SetFilters implements Action {
  readonly type = FiltersActionTypes.SetFilters;
  constructor(
    public readonly payload: {
      limit: number;
      offset: number;
      name: string[];
      business_profiles: string[];
      cities: string[];
      voivodeships: string[];
      countries: string[];
    }
  ) {}
}

export type FiltersActions = SetFilters;
