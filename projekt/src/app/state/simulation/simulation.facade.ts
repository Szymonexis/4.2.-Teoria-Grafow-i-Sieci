import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '..';
import { SetVizualizationStatePayload } from './simulation.model';

import * as selectors from './simulation.selectors';
import * as actions from './simulation.actions';

@Injectable({
  providedIn: 'root',
})
export class SimulationFacade {
  vizualizationState$ = this.store.pipe(
    select(selectors.selectVizualizationState)
  );

  constructor(private store: Store<AppState>) {}

  setVizualizationState(payload: SetVizualizationStatePayload): void {
    this.store.dispatch(actions.setVizualizationState(payload));
  }
}
