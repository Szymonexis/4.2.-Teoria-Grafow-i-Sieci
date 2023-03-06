import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { interval } from 'rxjs';
import { GraphFacade } from 'src/app/state/graph/graph.facade';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin implements OnInit {
  links$ = this.graphFacade.links$;
  nodes$ = this.graphFacade.nodes$;

  constructor(private graphFacade: GraphFacade) {
    super();
  }

  ngOnInit(): void {
    // @TODO: for `fun` dev purposes :3
    // interval(1000)
    //   .pipe(untilComponentDestroyed(this))
    //   .subscribe(() => {
    //     this.graphFacade.colorShow();
    //   });
  }
}
