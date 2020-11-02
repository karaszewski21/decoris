import { createSelector, createFeatureSelector } from "@ngrx/store";
import { FiltersState } from "../reducers";

export const getFiltersState = createFeatureSelector<FiltersState>(
  "filtersState"
);

export const getFilters = createSelector(getFiltersState, (state) => state);
