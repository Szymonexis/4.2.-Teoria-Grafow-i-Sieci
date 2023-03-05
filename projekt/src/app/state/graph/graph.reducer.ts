import { createReducer, on } from '@ngrx/store';
import { initialState, uuid } from './graph.model';

import * as actions from './graph.actions';

export const graphReducer = createReducer(
  initialState,
  on(actions.setNodesAndLinksTemplate, (state, { nodes, links }) => ({
    ...state,
    nodes,
    links,
  })),

  on(actions.createNode, (state, { label, data }) => ({
    ...state,
    nodes: [...state.nodes, { id: uuid(), label, data }],
  })),

  on(actions.createLink, (state, { source, target, data }) => ({
    ...state,
    links: [...state.links, { id: uuid(), source, target, data }],
  }))
);
