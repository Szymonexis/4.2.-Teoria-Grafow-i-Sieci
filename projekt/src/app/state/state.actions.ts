import { createAction, props } from '@ngrx/store';
import { SetVizualizationStatePayload } from './state.model';

export const setVisualizationState = createAction(
  '[Visualization State] Set visualization state',
  props<SetVizualizationStatePayload>()
);
