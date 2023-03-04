import { Action, ActionReducer } from '@ngrx/store';
import { GraphState } from './graph/graph.model';
import { graphReducer } from './graph/graph.reducer';
import { SimulationState } from './simulation/simulation.model';
import { simulationReducer } from './simulation/simulation.reducer';

export interface AppState {
  simulation: SimulationState;
  graph: GraphState;
}

interface AppReducers {
  simulation: ActionReducer<SimulationState, Action>;
  graph: ActionReducer<GraphState, Action>;
}

export const reducers: AppReducers = {
  simulation: simulationReducer,
  graph: graphReducer,
};
