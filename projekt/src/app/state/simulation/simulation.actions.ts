import { createAction, props } from '@ngrx/store';
import { SetVizualizationStatePayload } from './simulation.model';

export const setVizualizationState = createAction(
  '[Simulation] Set vizualization state',
  props<SetVizualizationStatePayload>()
);
