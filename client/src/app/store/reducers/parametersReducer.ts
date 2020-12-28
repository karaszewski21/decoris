import {
  ParametersActions,
  ParametersActionTypes,
} from "../actions/parametersAction";
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
} from "../../interfaces/client";

export interface State {
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

export const initialState: State = {
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
): State {
  switch (action.type) {
    case ParametersActionTypes.GetParameters: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetParametersSuccess: {
      let { cities } = state;
      let newState = { ...state };
      newState = {
        businessProfiles: action.payload.businessProfiles,
        cities: cities,
        voivodeships: action.payload.voivodeships,
        countries: action.payload.countries,
        aluminiumProfiles: action.payload.aluminiumProfiles,
        pcvProfiles: action.payload.pcvProfiles,
        aluminiumFittings: action.payload.aluminiumFittings,
        pcvFittings: action.payload.pcvFittings,
        positionEmployees: action.payload.positionEmployees,
        loading: action.payload.loading,
      };

      return newState;
    }

    case ParametersActionTypes.GetCitiesByCountry: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.GetCitiesByCountrySuccess: {
      let newState: State = null;
      newState = { ...state };
      newState.cities = action.payload.cities;
      newState.loading = action.payload.loading;

      return newState;
    }
    case ParametersActionTypes.AddParameter: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.AddParameterSuccess: {
      let { parameter } = action.payload.parameter;
      let newState: State = null;

      switch (parameter) {
        case "country":
          let countries: Country[] = [...state.countries];
          let country: Country = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexCountry = countries.findIndex(
            (value) => value.id === country.id
          );

          if (indexCountry > 0) {
            countries[indexCountry] = country;
          } else {
            countries.push(country);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            countries: countries,
          };

          break;
        case "city":
          let voivodeshipModel: Voivodeship = null;
          let countryModel: Country = null;
          let cities: City[] = [...state.cities];

          countryModel = {
            id: action.payload.parameter["country.id"],
            name: action.payload.parameter["country.name"],
          };

          if (action.payload.parameter["voivodeship.id"]) {
            voivodeshipModel = {
              id: action.payload.parameter["voivodeship.id"],
              name: action.payload.parameter["voivodeship.name"],
            };
          }

          let city: City = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
            voivodeship: voivodeshipModel,
            country: countryModel,
          };

          let indexCity = cities.findIndex((value) => value.id === city.id);
          if (indexCity > 0) {
            cities[indexCity] = city;
          } else {
            cities.push(city);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            cities: cities,
          };
          break;
        case "voivodeship":
          let voivodeships: Voivodeship[] = [...state.voivodeships];
          let voivodeship: Voivodeship = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexVoivodeship = voivodeships.findIndex(
            (value) => value.id === voivodeship.id
          );

          if (indexVoivodeship > 0) {
            voivodeships[indexVoivodeship] = voivodeship;
          } else {
            voivodeships.push(country);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            voivodeships: voivodeships,
          };

          break;
        case "businessProfile":
          let businessProfiles: BusinessProfile[] = [...state.businessProfiles];
          let businessProfile: BusinessProfile = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexBusinessProfile = businessProfiles.findIndex(
            (value) => value.id === businessProfile.id
          );

          if (indexBusinessProfile > 0) {
            businessProfiles[indexBusinessProfile] = businessProfile;
          } else {
            businessProfiles.push(businessProfile);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            businessProfiles: businessProfiles,
          };

          break;
        case "pcvProfile":
          let pcvProfiles: PcvProfile[] = [...state.pcvProfiles];
          let pcvProfile: PcvProfile = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexPcvProfile = pcvProfiles.findIndex(
            (value) => value.id === aluminiumProfile.id
          );

          if (indexPcvProfile > 0) {
            pcvProfiles[indexPcvProfile] = pcvProfile;
          } else {
            pcvProfiles.push(pcvProfile);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            pcvProfiles: pcvProfiles,
          };

          break;
        case "pcvFitting":
          let pcvFittings: PcvFitting[] = [...state.pcvFittings];
          let pcvFitting: PcvFitting = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexPcvFitting = pcvFittings.findIndex(
            (value) => value.id === pcvFitting.id
          );

          if (indexPcvFitting > 0) {
            pcvFittings[indexPcvFitting] = pcvFitting;
          } else {
            pcvFittings.push(pcvFitting);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            pcvFittings: pcvFittings,
          };

          break;
        case "aluminiumFitting":
          let aluminiumFittings: AluminiumFitting[] = [
            ...state.aluminiumFittings,
          ];
          let aluminiumFitting: AluminiumFitting = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexAluminiumFitting = aluminiumFittings.findIndex(
            (value) => value.id === aluminiumFitting.id
          );

          if (indexAluminiumFitting > 0) {
            aluminiumFittings[indexAluminiumFitting] = aluminiumFitting;
          } else {
            aluminiumFittings.push(aluminiumFitting);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            aluminiumFittings: aluminiumFittings,
          };

          break;
        case "aluminiumProfile":
          let aluminiumProfiles: AluminiumProfile[] = [
            ...state.aluminiumProfiles,
          ];
          let aluminiumProfile: AluminiumProfile = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexAluminiumProfile = aluminiumProfiles.findIndex(
            (value) => value.id === aluminiumProfile.id
          );

          if (indexAluminiumProfile > 0) {
            aluminiumProfiles[indexAluminiumProfile] = aluminiumProfile;
          } else {
            aluminiumProfiles.push(aluminiumProfile);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            aluminiumProfiles: aluminiumProfiles,
          };

          break;
        case "positionEmployee":
          let positionEmployees: PositionEmployee[] = [
            ...state.positionEmployees,
          ];
          let positionEmployee: PositionEmployee = {
            id: action.payload.parameter.id,
            name: action.payload.parameter.name,
          };

          let indexPositionEmployee = positionEmployees.findIndex(
            (value) => value.id === positionEmployee.id
          );

          if (indexPositionEmployee > 0) {
            positionEmployees[indexPositionEmployee] = positionEmployee;
          } else {
            positionEmployees.push(positionEmployee);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            positionEmployees: positionEmployees,
          };

          break;
        default: {
          return state;
        }
      }

      return newState;
    }

    case ParametersActionTypes.RemoveParameter: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ParametersActionTypes.RemoveParameterSuccess: {
      let { parameter } = action.payload.parameter;
      let newState: State = null;

      switch (parameter) {
        case "country":
          let countries: Country[] = [...state.countries];
          let country: Country = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexCountry = countries.findIndex(
            (value) => value.id === country.id
          );

          if (indexCountry > 0) {
            countries.splice(indexCountry, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            countries: countries,
          };

          break;
        case "city":
          let cities: City[] = [...state.cities];

          let city: City = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
            voivodeship: null,
            country: null,
          };

          let indexCity = cities.findIndex((value) => value.id === city.id);
          if (indexCity > 0) {
            cities.splice(indexCity, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            cities: cities,
          };
          break;
        case "voivodeship":
          let voivodeships: Voivodeship[] = [...state.voivodeships];
          let voivodeship: Voivodeship = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexVoivodeship = voivodeships.findIndex(
            (value) => value.id === voivodeship.id
          );

          if (indexVoivodeship > 0) {
            voivodeships.splice(indexVoivodeship, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            voivodeships: voivodeships,
          };

          break;
        case "businessProfile":
          let businessProfiles: BusinessProfile[] = [...state.businessProfiles];
          let businessProfile: BusinessProfile = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexBusinessProfile = businessProfiles.findIndex(
            (value) => value.id === businessProfile.id
          );

          if (indexBusinessProfile > 0) {
            businessProfiles.splice(indexBusinessProfile, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            businessProfiles: businessProfiles,
          };

          break;
        case "pcvProfile":
          let pcvProfiles: PcvProfile[] = [...state.pcvProfiles];
          let pcvProfile: PcvProfile = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexPcvProfile = pcvProfiles.findIndex(
            (value) => value.id === pcvProfile.id
          );

          if (indexPcvProfile > 0) {
            pcvProfiles.splice(indexPcvProfile, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            pcvProfiles: pcvProfiles,
          };

          break;
        case "pcvFitting":
          let pcvFittings: PcvFitting[] = [...state.pcvFittings];
          let pcvFitting: PcvFitting = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexPcvFitting = pcvFittings.findIndex(
            (value) => value.id === pcvFitting.id
          );

          if (indexPcvFitting > 0) {
            pcvFittings.splice(indexPcvFitting, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            pcvFittings: pcvFittings,
          };

          break;
        case "aluminiumFitting":
          let aluminiumFittings: AluminiumFitting[] = [
            ...state.aluminiumFittings,
          ];
          let aluminiumFitting: AluminiumFitting = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexAluminiumFitting = aluminiumFittings.findIndex(
            (value) => value.id === aluminiumFitting.id
          );

          if (indexAluminiumFitting > 0) {
            aluminiumFittings.splice(indexAluminiumFitting, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            aluminiumFittings: aluminiumFittings,
          };

          break;
        case "aluminiumProfile":
          let aluminiumProfiles: AluminiumProfile[] = [
            ...state.aluminiumProfiles,
          ];
          let aluminiumProfile: AluminiumProfile = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexAluminiumProfile = aluminiumProfiles.findIndex(
            (value) => value.id === aluminiumProfile.id
          );

          if (indexAluminiumProfile > 0) {
            aluminiumProfiles.splice(indexAluminiumProfile, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            aluminiumProfiles: aluminiumProfiles,
          };

          break;
        case "positionEmployee":
          let positionEmployees: PositionEmployee[] = [
            ...state.positionEmployees,
          ];

          let positionEmployee: PositionEmployee = {
            id: action.payload.parameter.value.id,
            name: action.payload.parameter.value.name,
          };

          let indexPositionEmployee = positionEmployees.findIndex(
            (value) => value.id === positionEmployee.id
          );
          console.log(indexPositionEmployee);
          if (indexPositionEmployee > 0) {
            positionEmployees.splice(indexPositionEmployee, 1);
          }

          newState = {
            ...state,
            loading: action.payload.loading,
            positionEmployees: positionEmployees,
          };

          break;
        default: {
          return state;
        }
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}
