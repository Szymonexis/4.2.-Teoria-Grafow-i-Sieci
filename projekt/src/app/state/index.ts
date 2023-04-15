import { Action, ActionReducer } from '@ngrx/store';
import { GraphFacade } from './graph/graph.facade';
import { GraphState } from './graph/graph.model';
import { graphReducer } from './graph/graph.reducer';

export interface AppState {
  graph: GraphState;
}

interface AppReducers {
  graph: ActionReducer<GraphState, Action>;
}

export const reducers: AppReducers = {
  graph: graphReducer,
};

export const facades = [GraphFacade];
