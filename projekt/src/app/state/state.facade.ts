import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as actions from './state.actions';
import * as selectors from './state.selectors';
import { GlobalState, SetVizualizationStatePayload } from './state.model';

@Injectable({ providedIn: 'root' })
export class GlobalFacade {
  vizualizationState$ = this.store.pipe(
    select(selectors.selectVizualizationState)
  );

  constructor(private store: Store<GlobalState>) {}

  setVizualizationState(payload: SetVizualizationStatePayload): void {
    this.store.dispatch(actions.setVisualizationState(payload));
  }
}
