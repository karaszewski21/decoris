import { FiltersActionTypes, FiltersActions } from "../actions/filtersAction";
import {
  BusinessProfile,
  City,
  Voivodeship,
  Country,
} from "../../../interfaces/client";

export interface FiltersState {
  limit: number;
  offset: number;
  name: string[];
  business_profiles: BusinessProfile[];
  cities: City[];
  voivodeships: Voivodeship[];
  countries: Country[];
}

const initialState: FiltersState = {
  limit: 0,
  offset: 0,
  name: [],
  business_profiles: [],
  cities: [],
  voivodeships: [],
  countries: [],
};

export function filtersReducer(state = initialState, action: FiltersActions) {
  switch (action.type) {
    case FiltersActionTypes.SetFilters: {
      return {
        ...state,
        limit: action.payload.limit,
        offset: action.payload.offset,
        business_profiles: action.payload.business_profiles,
        cities: action.payload.cities,
        countries: action.payload.countries,
        voivodeships: action.payload.voivodeships,
      };
    }

    default: {
      return state;
    }
  }
}
