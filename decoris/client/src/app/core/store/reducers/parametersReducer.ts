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
  PositionEmployee,
} from "../../../interfaces/client";

export interface ParametersState {
  businessProfiles: BusinessProfile[];
  cities: City[];
  voivodeships: Voivodeship[];
  countries: Country[];
  aluminiumProfiles: AluminiumProfile[];
  pcvProfiles: PcvProfile[];
  aluminiumFittings: AluminiumFitting[];
  pcvFittings: PcvFitting[];
  positionEmployees: PositionEmployee[];
  loading: boolean;
}

const initialState: ParametersState = {
  businessProfiles: [],
  cities: [],
  voivodeships: [],
  countries: [],
  aluminiumProfiles: [],
  pcvProfiles: [],
  aluminiumFittings: [],
  pcvFittings: [],
  positionEmployees: [],
  loading: false,
};

export function parametersReducer(
  state = initialState,
  action: ParametersActions
) {
  switch (action.type) {
    case ParametersActionTypes.GetParameters: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetParametersSuccess: {
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
        positionEmployees: action.payload.positionEmployees,
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
    case ParametersActionTypes.AddParameter: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.AddParameterSuccess: {
      let { parameter } = action.payload.parameter;

      let newState = null;

      switch (parameter) {
        case "city":
          let voivodeship: Voivodeship = null;
          let country: Country = null;

          country = {
            id: action.payload.parameter["country.id"],
            name: action.payload.parameter["country.name"],
          };

          if (action.payload.parameter["voivodeship.id"]) {
            voivodeship = {
              id: action.payload.parameter["voivodeship.id"],
              name: action.payload.parameter["voivodeship.name"],
            };
          }

          let city: City = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
            voivodeship: voivodeship,
            country: country,
          };

          //modify array city

          newState = {
            ...state,
            loading: action.payload.loading,
            cities: city,
          };
          break;

        default:
          break;
      }

      return newState;
    }

    default: {
      return state;
    }

    case ParametersActionTypes.RemoveParameter: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.RemoveParameterSuccess: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }
  }
}
