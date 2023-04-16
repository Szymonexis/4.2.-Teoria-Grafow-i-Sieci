import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { GraphState } from './graph.model';

const selectGraphState = (state: AppState): GraphState => state.graph;

export const selectCurrentPresentationState = createSelector(
  selectGraphState,
  (state: GraphState) => state.currentPresentationState
);

export const selectPresentationStatesWithCurrentIndex = createSelector(
  selectGraphState,
  (state: GraphState) => ({
    index: state.currentPresentationStateIndex,
    states: state.presentationStates,
  })
);

export const selectNodes = createSelector(
  selectGraphState,
  (state: GraphState) => state.nodes
);

export const selectLinks = createSelector(
  selectGraphState,
  (state: GraphState) => state.links
);

export const selectSource = createSelector(
  selectGraphState,
  (state: GraphState) => state.source
);
