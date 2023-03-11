import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { combineLatest } from 'rxjs';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { Link, Node } from 'src/app/state/graph/graph.model';
import { SimulationFacade } from 'src/app/state/simulation/simulation.facade';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin implements OnInit {
  private _links$ = this.graphFacade.links$;
  private _nodes$ = this.graphFacade.nodes$;
  private _simulationData$ = this.simulationFacade.simulationData$;

  nodes: Node[];
  links: Link[];

  constructor(
    private graphFacade: GraphFacade,
    private simulationFacade: SimulationFacade
  ) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this._nodes$, this._links$, this._simulationData$])
      .pipe(untilComponentDestroyed(this))
      .subscribe(([nodes, links, { simulationNodes, simulationLinks }]) => {
        this.links = [...links, ...simulationLinks];
        this.nodes = [...nodes, ...simulationNodes];
      });
  }
}
