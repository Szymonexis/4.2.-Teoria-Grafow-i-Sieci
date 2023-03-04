import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { GraphState } from './graph.model';

const selectSimulationState = (state: AppState): GraphState => state.graph;

export const selectNodes = createSelector(
  selectSimulationState,
  (state: GraphState) => state.nodes
);

export const selectLinks = createSelector(
  selectSimulationState,
  (state: GraphState) => state.links
);
