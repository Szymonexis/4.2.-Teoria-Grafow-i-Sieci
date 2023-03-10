import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

import { BellmanFordService } from 'src/app/services/bellman-ford.service';
import { SimulationFacade } from 'src/app/state/simulation/simulation.facade';
import { VIZUALIZATION_STATE } from 'src/app/state/simulation/simulation.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  visualizationState$ = this.simulationFacade.vizualizationState$;

  VIZUALIZATION_STATE = VIZUALIZATION_STATE;
  isStarted = false;

  constructor(
    private simulationFacade: SimulationFacade,
    private bellmanFordService: BellmanFordService
  ) {
    super();
  }

  ngOnInit(): void {
    this.visualizationState$
      .pipe(untilComponentDestroyed(this))
      .subscribe((visualizationState) => {
        this.isStarted = visualizationState === VIZUALIZATION_STATE.START;
        const isStopped = visualizationState === VIZUALIZATION_STATE.STOP;

        if (this.isStarted) {
          this.bellmanFordService.init();
          this.bellmanFordService.compute();
        }

        if (isStopped) {
          const { simulationGraph, simulationSteps } =
            this.bellmanFordService.reset();

          console.log({ simulationGraph, simulationSteps });
        }
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
