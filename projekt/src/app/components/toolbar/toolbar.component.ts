import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { Subscription, combineLatest, timer } from 'rxjs';

import { BellmanFordService } from 'src/app/services/bellman-ford.service';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { Link, Node, PresentationState } from 'src/app/state/graph/graph.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  source$ = this.graphFacade.source$;
  nodes$ = this.graphFacade.nodes$;
  links$ = this.graphFacade.links$;
  presentationStatesWithIndex$ =
    this.graphFacade.presentationStatesWithCurrentIndex$;

  autoMode = false;
  autoModeInterval = 1000;
  private autoSubscription: Subscription;

  private source: Node;
  private nodes: Node[];
  private links: Link[];
  private index: number;
  private states: PresentationState[];

  get disableControls(): boolean {
    return !this.source || !this.nodes || !this.links;
  }

  get disableCounter(): boolean {
    return this.index === null || !this.states;
  }

  get disableAuto(): boolean {
    return this.disableControls || this.disableCounter;
  }

  get disablePrevious(): boolean {
    return this.disableControls || this.disableCounter || this.index === 0;
  }

  get disableNext(): boolean {
    return (
      this.disableControls ||
      this.disableCounter ||
      this.index + 1 === this.states?.length
    );
  }

  constructor(
    private bellmanFordService: BellmanFordService,
    private graphFacade: GraphFacade,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    combineLatest([
      this.source$,
      this.nodes$,
      this.links$,
      this.presentationStatesWithIndex$,
    ])
      .pipe(untilComponentDestroyed(this))
      .subscribe(([source, nodes, links, { index, states }]) => {
        this.source = source;
        this.nodes = nodes;
        this.links = links;
        this.index = index;
        this.states = states;
      });
  }

  onGenerate(): void {
    try {
      const presentationStates = this.bellmanFordService.compute(
        this.source.id,
        this.nodes,
        this.links
      );

      this.graphFacade.setPresentationStates({ presentationStates });
    } catch (error) {
      this.dialog.open(DialogComponent, {
        data: error,
        width: '25rem',
      });
    }
  }

  onPrevious(): void {
    this.graphFacade.pickCurrentPresentationState({
      currentPresentationStateIndex: this.index - 1,
    });
  }

  onNext(): void {
    this.graphFacade.pickCurrentPresentationState({
      currentPresentationStateIndex: this.index + 1,
    });
  }

  onAutoToggle(): void {
    if (!this.autoMode) {
      this.autoSubscription = timer(0, this.autoModeInterval)
        .pipe(untilComponentDestroyed(this))
        .subscribe(() => {
          this.onNext();
        });

      this.autoMode = true;
      return;
    }

    if (this.autoMode) {
      this.autoSubscription.unsubscribe();
      this.autoMode = false;
    }
  }
}
