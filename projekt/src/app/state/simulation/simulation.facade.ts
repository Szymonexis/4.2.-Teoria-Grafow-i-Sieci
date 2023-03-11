import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '..';
import {
  SetVizualizationStatePayload,
  SetSimulationDataPayload,
  ShowNextSimulationStepPayload,
} from './simulation.model';

import * as selectors from './simulation.selectors';
import * as actions from './simulation.actions';

@Injectable()
export class SimulationFacade {
  vizualizationState$ = this.store.pipe(
    select(selectors.selectVizualizationState)
  );
  simulationData$ = this.store.pipe(select(selectors.selectSimulationData));
  simulationSteps$ = this.store.pipe(select(selectors.selectSimulationSteps));

  constructor(private store: Store<AppState>) {}

  setVizualizationState(payload: SetVizualizationStatePayload): void {
    this.store.dispatch(actions.setVizualizationState(payload));
  }

  setSimulationData(payload: SetSimulationDataPayload): void {
    this.store.dispatch(actions.setSimulationData(payload));
  }

  showNextSimulationStep(payload: ShowNextSimulationStepPayload): void {
    this.store.dispatch(actions.showNextSimulationStep(payload));
  }
}
