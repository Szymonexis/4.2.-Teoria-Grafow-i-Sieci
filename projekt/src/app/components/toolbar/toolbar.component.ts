import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

import { setVizualizationState } from 'src/app/state/simulation/simulation.actions';
import { SimulationFacade } from 'src/app/state/simulation/simulation.facade';
import { VIZUALIZATION_STATE } from 'src/app/state/simulation/simulation.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  // visualizationState$ = this.globalFacade.vizualizationState$;

  VIZUALIZATION_STATE = VIZUALIZATION_STATE;
  isStarted = false;
  visualizationState$ = this.simulationFacade.vizualizationState$;

  constructor(private simulationFacade: SimulationFacade) {
    super();
  }

  ngOnInit(): void {
    this.visualizationState$
      .pipe(untilComponentDestroyed(this))
      .subscribe((visualizationState) => {
        this.isStarted = visualizationState === VIZUALIZATION_STATE.START;
      });
  }

  onStartStop(): void {
    if (this.isStarted) {
      this.simulationFacade.setVizualizationState({
        vizualizationState: VIZUALIZATION_STATE.STOP,
      });
      return;
    }

    this.simulationFacade.setVizualizationState({
      vizualizationState: VIZUALIZATION_STATE.START,
    });
  }

  onPause(): void {
    if (!this.isStarted) {
      return;
    }

    this.simulationFacade.setVizualizationState({
      vizualizationState: VIZUALIZATION_STATE.PAUSE,
    });
  }
}
