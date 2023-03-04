export enum VIZUALIZATION_STATE {
  START = 'START',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
}

export interface SetVizualizationStatePayload {
  vizualizationState: VIZUALIZATION_STATE;
}

export interface SimulationState {
  vizualizationState: VIZUALIZATION_STATE;
}

export const initialState: SimulationState = {
  vizualizationState: VIZUALIZATION_STATE.STOP,
};
