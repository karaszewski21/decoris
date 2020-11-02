import {
  ParametersActions,
  ParametersActionTypes,
} from "../actions/parametersAction";
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

export interface ParametersState {
  client: Company;
  businessProfiles: BusinessProfile[];
  cities: City[];
  voivodeships: Voivodeship[];
  countries: Country[];
  aluminiumProfiles: AluminiumProfile[];
  pcvProfiles: PcvProfile[];
  aluminiumFittings: AluminiumFitting[];
  pcvFittings: PcvFitting[];
  loading: boolean;
}

const initialState: ParametersState = {
  client: null,
  businessProfiles: [],
  cities: [],
  voivodeships: [],
  countries: [],
  aluminiumProfiles: [],
  pcvProfiles: [],
  aluminiumFittings: [],
  pcvFittings: [],
  loading: false,
};

export function parametersReducer(
  state = initialState,
  action: ParametersActions
) {
  switch (action.type) {
    case ParametersActionTypes.GetParametrs: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetParametrsSuccess: {
      return {
        ...state,
        businessProfiles: action.payload.businessProfiles,
        cities: action.payload.cities,
        voivodeships: action.payload.voivodeships,
        countries: action.payload.countries,
        aluminiumProfiles: action.payload.aluminiumProfiles,
        pcvProfiles: action.payload.pcvProfiles,
        aluminiumFittings: action.payload.aluminiumFittings,
        pcvFittings: action.payload.pcvFittings,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetCitiesByCountry: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetCitiesByCountrySuccess: {
      return {
        ...state,
        loading: action.payload.loading,
        cities: action.payload.cities,
      };
    }

    default: {
      return state;
    }
  }
}
