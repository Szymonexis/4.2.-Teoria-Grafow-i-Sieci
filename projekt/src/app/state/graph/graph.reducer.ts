import { createReducer } from '@ngrx/store';
import { initialState } from './graph.model';

export const graphReducer = createReducer(initialState);
