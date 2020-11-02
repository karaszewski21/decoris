import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ParametersState } from "../reducers";

export const getParametrsState = createFeatureSelector<any>("client");

export const getCities = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.cities
);
export const getCountries = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.countries
);
export const getVoivodeships = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.voivodeships
);
export const getBusinessProfiles = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.businessProfiles
);
export const getAluminiumProfiles = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.aluminiumProfiles
);
export const getAluminiumFittings = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.aluminiumFittings
);
export const getPcvProfiles = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.pcvProfiles
);
export const getPcvFittings = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.pcvFittings
);

export const getParametersLoading = createSelector(
  getParametrsState,
  (state) => state.parametersReducer.loading
);
