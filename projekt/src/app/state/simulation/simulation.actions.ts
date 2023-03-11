import { createAction, props } from '@ngrx/store';
import {
  SetSimulationDataPayload,
  SetVizualizationStatePayload,
  ShowNextSimulationStepPayload,
} from './simulation.model';

export const setVizualizationState = createAction(
  '[Simulation] Set vizualization state',
  props<SetVizualizationStatePayload>()
);

export const setSimulationData = createAction(
  '[Simulation] Set simulation data',
  props<SetSimulationDataPayload>()
);

export const showNextSimulationStep = createAction(
  '[Simulation] Show next simulation step',
  props<ShowNextSimulationStepPayload>()
);
