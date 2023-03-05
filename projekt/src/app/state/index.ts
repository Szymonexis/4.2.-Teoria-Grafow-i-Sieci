import { Action, ActionReducer } from '@ngrx/store';
import { GraphFacade } from './graph/graph.facade';
import { GraphState } from './graph/graph.model';
import { graphReducer } from './graph/graph.reducer';
import { SimulationFacade } from './simulation/simulation.facade';
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

export const facades = [GraphFacade, SimulationFacade];
