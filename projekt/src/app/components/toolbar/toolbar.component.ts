import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { delay } from 'lodash';
import { combineLatest, interval, subscribeOn, takeUntil } from 'rxjs';

import { BellmanFordService } from 'src/app/services/bellman-ford.service';
import { SimulationFacade } from 'src/app/state/simulation/simulation.facade';
import {
  SimulationStep,
  VIZUALIZATION_STATE,
} from 'src/app/state/simulation/simulation.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  visualizationState$ = this.simulationFacade.vizualizationState$;
  simulationData$ = this.simulationFacade.simulationData$;
  simulationSteps$ = this.simulationFacade.simulationSteps$;

  VIZUALIZATION_STATE = VIZUALIZATION_STATE;
  isStarted = false;
  isStopped = true;
  isPaused = false;

  private _simulationStepIndex = 0;
  private _simulationSteps: SimulationStep[] = [];

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
        this.isPaused = visualizationState === VIZUALIZATION_STATE.PAUSE;
        this.isStopped = visualizationState === VIZUALIZATION_STATE.STOP;

        if (this.isStarted) {
          this.bellmanFordService.init();
          this.bellmanFordService.compute();
        }

        if (this.isStopped) {
          this.bellmanFordService.reset();
        }
      });

    this.simulationSteps$
      .pipe(untilComponentDestroyed(this))
      .subscribe((simulationSteps) => {
        this._simulationSteps = simulationSteps;
      });

    // @TODO: add reaction to start and stop,
    // add interval setting, investigate very wrong steps
    interval(5000)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this.simulationFacade.showNextSimulationStep(
          this._simulationSteps[this._simulationStepIndex]
        );

        this._simulationStepIndex += 1;
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
