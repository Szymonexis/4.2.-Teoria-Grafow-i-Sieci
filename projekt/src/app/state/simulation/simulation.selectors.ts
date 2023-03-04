import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { SimulationState } from './simulation.model';

const selectSimulationState = (state: AppState): SimulationState =>
  state.simulation;

export const selectVizualizationState = createSelector(
  selectSimulationState,
  (state: SimulationState) => state.vizualizationState
);
