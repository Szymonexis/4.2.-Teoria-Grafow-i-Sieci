import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { combineLatest } from 'rxjs';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { Link, Node } from 'src/app/state/graph/graph.model';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin {
  links$ = this.graphFacade.links$;
  nodes$ = this.graphFacade.nodes$;
  currentState$ = this.graphFacade.currentPresentationState$;

  constructor(private graphFacade: GraphFacade) {
    super();
  }
}
