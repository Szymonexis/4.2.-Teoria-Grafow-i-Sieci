import { createReducer, on } from '@ngrx/store';
import { COLOR, initialState, uuid } from './graph.model';

import * as actions from './graph.actions';

const generateRandomColor = (): COLOR =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}` as COLOR;

export const graphReducer = createReducer(
  initialState,
  on(actions.setPresentationStates, (state, { presentationStates }) => ({
    ...state,
    presentationStates: [...presentationStates],
    currentPresentationState: presentationStates[0],
    currentPresentationStateIndex: 0,
  })),

  on(actions.setNodesAndLinksTemplate, (state, { nodes, links }) => ({
    ...state,
    nodes,
    links,
  })),

  on(
    actions.pickCurrentPresentationState,
    (state, { currentPresentationStateIndex: index }) => ({
      ...state,
      currentPresentationState: { ...state.presentationStates[index] },
      currentPresentationStateIndex: index,
    })
  ),

  on(actions.setAlgoSourceNode, (state, { source }) => ({
    ...state,
    source,
  })),

  on(actions.createNode, (state, { label, data }) => ({
    ...state,
    nodes: [...state.nodes, { id: uuid(), label, data }],
  })),

  on(actions.deleteNode, (state, { id: nodeId }) => ({
    ...state,
    nodes: [...state.nodes.filter(({ id }) => id !== nodeId)],
    links: [
      ...state.links.filter(
        ({ source, target }) => source !== nodeId && target !== nodeId
      ),
    ],
  })),

  on(actions.createLink, (state, { source, target, data }) => ({
    ...state,
    links: [...state.links, { id: uuid(), source, target, data }],
  })),

  on(actions.deleteLink, (state, { id: linkId }) => ({
    ...state,
    links: [...state.links.filter(({ id }) => id !== linkId)],
  })),

  on(actions.colorShow, (state) => ({
    ...state,
    nodes: [
      ...state.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          customColor: generateRandomColor(),
        },
      })),
    ],
    links: [
      ...state.links.map((link) => ({
        ...link,
        data: {
          ...link.data,
          customColor: generateRandomColor(),
        },
      })),
    ],
  }))
);
