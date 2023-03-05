import { Component } from '@angular/core';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { GraphFacade } from 'src/app/state/graph/graph.facade';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin {
  links$ = this.graphFacade.links$;
  nodes$ = this.graphFacade.nodes$;

  constructor(private graphFacade: GraphFacade) {
    super();
  }
}
