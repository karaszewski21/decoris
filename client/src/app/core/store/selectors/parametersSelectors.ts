import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ParametersState } from "../reducers";

export const getParametrsState = createFeatureSelector<any>("client");
//export const getClientsState = createFeatureSelector<any>("client");

export const getCities = createSelector(
  getParametrsState,
  (state) => state.parametersReducer?.cities ?? state.clientsReducer?.clients
);
export const getCountries = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.countries ?? state.clientsReducer?.countries
);
export const getVoivodeships = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.voivodeships ?? state.clientsReducer?.voivodeships
);
export const getBusinessProfiles = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.businessProfiles ??
    state.clientsReducer?.businessProfiles
);
export const getAluminiumProfiles = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.aluminiumProfiles ??
    state.clientsReducer?.aluminiumProfiles
);
export const getAluminiumFittings = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.aluminiumFittings ??
    state.clientsReducer?.aluminiumFittings
);
export const getPcvProfiles = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.pcvProfiles ?? state.clientsReducer?.pcvProfiles
);
export const getPcvFittings = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.pcvFittings ?? state.clientsReducer?.pcvFittings
);

export const getPositionEmployees = createSelector(
  getParametrsState,
  (state) =>
    state.parametersReducer?.positionEmployees ??
    state.clientsReducer?.positionEmployees
);

export const getParametersLoading = createSelector(
  getParametrsState,
  (state) => state.parametersReducer?.loading ?? state.clientsReducer.loading
);
