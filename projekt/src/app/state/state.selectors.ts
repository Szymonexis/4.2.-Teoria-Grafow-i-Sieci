import { createSelector } from '@ngrx/store';
import { GlobalState } from './state.model';

export const selectGlobalState = (state: GlobalState): GlobalState => state;

export const selectVizualizationState = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.simulation.vizualizationState
);
