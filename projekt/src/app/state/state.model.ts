export type Id = string;

export enum COLOR {
  CURRENT = '#ff0000',
  SOLVED = '#00ff00',
  UNSOLVED = '#0000ff',
}

export enum VIZUALIZATION_STATE {
  START = 'START',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
}

export interface Data {
  color: COLOR;
}

export interface Link {
  id: Id;
  source: Id;
  target: Id;
  data: Data;
}

export interface Node {
  id: Id;
  label: string;
  data: Data;
}

export interface Simulation {
  vizualizationState: VIZUALIZATION_STATE;
}

export interface GlobalState {
  simulation: Simulation;
  nodes: Node[];
  links: Link[];
}

export const initialState: GlobalState = {
  simulation: {
    vizualizationState: VIZUALIZATION_STATE.STOP,
  },
  nodes: [],
  links: [],
};

export interface SetVizualizationStatePayload {
  vizualizationState: VIZUALIZATION_STATE;
}
