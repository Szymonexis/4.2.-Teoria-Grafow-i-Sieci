import { createReducer, on } from '@ngrx/store';

import { initialState } from './simulation.model';

import * as actions from './simulation.actions';

export const simulationReducer = createReducer(
  initialState,
  on(actions.setVizualizationState, (state, { vizualizationState }) => ({
    ...state,
    vizualizationState,
  }))
);
