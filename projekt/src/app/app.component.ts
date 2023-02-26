import { Component } from '@angular/core';
import { VIZUALIZATION_STATE } from './shared/enums/vizualization-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  visualizationState = VIZUALIZATION_STATE.STOP;
  VIZUALIZATION_STATE = VIZUALIZATION_STATE;

  get isStarted(): boolean {
    return this.visualizationState === VIZUALIZATION_STATE.START;
  }

  constructor() {}

  onStartStop(): void {
    if (this.isStarted) {
      this.visualizationState = VIZUALIZATION_STATE.STOP;
      return;
    }

    this.visualizationState = VIZUALIZATION_STATE.START;
  }

  onPause(): void {
    if (!this.isStarted) {
      return;
    }

    this.visualizationState = VIZUALIZATION_STATE.PAUSE;
  }
}
