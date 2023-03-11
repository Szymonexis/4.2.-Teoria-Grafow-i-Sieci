import { Id, Link, Node } from '../graph/graph.model';

export enum VIZUALIZATION_STATE {
  START = 'START',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
}

export interface BellmanFordEdge {
  id: Id;
  source: Id;
  target: Id;
  cost: number;
}

export interface SimulationStep {
  source: Id;
  target: Id;
  cost: number;
}

export interface SimulationGraph {
  nodes: Node[];
  links: Link[];
}

export interface SimulationData {
  simulationGraph: SimulationGraph;
  simulationSteps: SimulationStep[];
}

export interface IdTranslation {
  oldId: Id;
  newId: Id;
}

export interface Distances {
  [key: Id]: number;
}

export interface SetVizualizationStatePayload {
  vizualizationState: VIZUALIZATION_STATE;
}

export type SetSimulationDataPayload = SimulationData;

export type ShowNextSimulationStepPayload = SimulationStep;

export interface SimulationState {
  vizualizationState: VIZUALIZATION_STATE;
  simulationData: {
    simulationNodes: Node[];
    simulationLinks: Link[];
    simulationSteps: SimulationStep[];
  };
}

export const initialState: SimulationState = {
  vizualizationState: VIZUALIZATION_STATE.STOP,
  simulationData: {
    simulationNodes: [],
    simulationLinks: [],
    simulationSteps: [],
  },
};
