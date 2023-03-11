import { createReducer, on } from '@ngrx/store';

import { initialState } from './simulation.model';

import * as actions from './simulation.actions';
import { COLOR } from '../graph/graph.model';

export const simulationReducer = createReducer(
  initialState,
  on(actions.setVizualizationState, (state, { vizualizationState }) => ({
    ...state,
    vizualizationState,
  })),

  on(
    actions.setSimulationData,
    (state, { simulationGraph: { nodes, links }, simulationSteps }) => ({
      ...state,
      simulationData: {
        simulationLinks: links,
        simulationNodes: nodes,
        simulationSteps,
      },
    })
  ),

  on(actions.showNextSimulationStep, (state, { source, target, cost }) => ({
    ...state,
    simulationData: {
      ...state.simulationData,
      simulationLinks: [
        ...state.simulationData.simulationLinks.map((link) => ({
          ...link,
          data: {
            ...link.data,
            cost:
              link.source === source &&
              link.target === target &&
              link.data.cost > cost
                ? cost
                : link.data.cost,
          },
        })),
      ],
      simulationNodes: [
        ...state.simulationData.simulationNodes.map((node) => ({
          ...node,
          data: {
            customColor:
              node.id === source || node.id === target
                ? COLOR.CURRENT
                : COLOR.UNSOLVED,
          },
        })),
      ],
    },
  }))
);
