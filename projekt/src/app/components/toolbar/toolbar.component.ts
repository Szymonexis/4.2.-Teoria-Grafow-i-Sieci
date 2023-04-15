import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { combineLatest } from 'rxjs';

import { BellmanFordService } from 'src/app/services/bellman-ford.service';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { Link, Node } from 'src/app/state/graph/graph.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends OnDestroyMixin implements OnInit {
  source$ = this.graphFacade.source$;
  nodes$ = this.graphFacade.nodes$;
  links$ = this.graphFacade.links$;

  private source: Node;
  private nodes: Node[];
  private links: Link[];

  constructor(
    private bellmanFordService: BellmanFordService,
    private graphFacade: GraphFacade
  ) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.source$, this.nodes$, this.links$])
      .pipe(untilComponentDestroyed(this))
      .subscribe(([source, nodes, links]) => {
        this.source = source;
        this.nodes = nodes;
        this.links = links;
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
}
