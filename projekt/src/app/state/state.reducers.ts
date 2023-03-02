import { createReducer, on } from '@ngrx/store';
import { initialState } from './state.model';

import * as actions from './state.actions';

export const simulationReducer = createReducer(
  initialState,
  on(actions.setVisualizationState, (state, { vizualizationState }) => ({
    ...state,
    simulation: { vizualizationState },
  }))
);
