import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromParameters from "../reducers/parametersReducer";

export const getParametrsState = createFeatureSelector<fromParameters.State>(
  "parameters"
);

export const getCities = createSelector(
  getParametrsState,
  (state) => state.cities
);
export const getCountries = createSelector(
  getParametrsState,
  (state) => state.countries
);
export const getVoivodeships = createSelector(
  getParametrsState,
  (state) => state.voivodeships
);
export const getBusinessProfiles = createSelector(
  getParametrsState,
  (state) => state.businessProfiles
);
export const getAluminiumProfiles = createSelector(
  getParametrsState,
  (state) => state.aluminiumProfiles
);
export const getAluminiumFittings = createSelector(
  getParametrsState,
  (state) => state.aluminiumFittings
);
export const getPcvProfiles = createSelector(
  getParametrsState,
  (state) => state.pcvProfiles
);
export const getPcvFittings = createSelector(
  getParametrsState,
  (state) => state.pcvFittings
);

export const getPositionEmployees = createSelector(
  getParametrsState,
  (state) => state.positionEmployees
);

export const getParametersLoading = createSelector(
  getParametrsState,
  (state) => state.loading
);
