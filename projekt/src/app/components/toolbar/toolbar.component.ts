import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { combineLatest } from 'rxjs';

import { BellmanFordService } from 'src/app/services/bellman-ford.service';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { Link, Node, PresentationState } from 'src/app/state/graph/graph.model';

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

  private source: Node;
  private nodes: Node[];
  private links: Link[];
  private index: number;
  private states: PresentationState[];

  get disableControls(): boolean {
    return !this.source || !this.nodes || !this.links;
  }

  get disablePrevious(): boolean {
    return this.disableControls || this.index === 0;
  }

  get disableNext(): boolean {
    return this.disableControls || this.index + 1 === this.states?.length;
  }

  get disableCounter(): boolean {
    return this.index === null || !this.states;
  }

  constructor(
    private bellmanFordService: BellmanFordService,
    private graphFacade: GraphFacade
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
    const presentationStates = this.bellmanFordService.compute(
      this.source.id,
      this.nodes,
      this.links
    );

    this.graphFacade.setPresentationStates({ presentationStates });
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
}
