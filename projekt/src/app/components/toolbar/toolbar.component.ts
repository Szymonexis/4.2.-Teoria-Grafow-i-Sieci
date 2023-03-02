import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { GlobalFacade } from 'src/app/state/state.facade';
import { VIZUALIZATION_STATE } from 'src/app/state/state.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  visualizationState$ = this.globalFacade.vizualizationState$;

  VIZUALIZATION_STATE = VIZUALIZATION_STATE;
  isStarted = false;

  constructor(private globalFacade: GlobalFacade) {
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
      this.globalFacade.setVizualizationState({
        vizualizationState: VIZUALIZATION_STATE.STOP,
      });
      return;
    }

    this.globalFacade.setVizualizationState({
      vizualizationState: VIZUALIZATION_STATE.START,
    });
  }

  onPause(): void {
    if (!this.isStarted) {
      return;
    }

    this.globalFacade.setVizualizationState({
      vizualizationState: VIZUALIZATION_STATE.PAUSE,
    });
  }
}
