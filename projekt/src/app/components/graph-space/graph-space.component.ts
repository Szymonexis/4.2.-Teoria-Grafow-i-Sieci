import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { COLOR, Link, Node } from 'src/app/state/graph/graph.model';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin implements OnInit {
  currentState$ = this.graphFacade.currentPresentationState$;

  links$ = this.graphFacade.links$;

  _nodes$ = this.graphFacade.nodes$;
  nodes$ = this._getNodes();

  currentLink: Link = null;

  constructor(private graphFacade: GraphFacade) {
    super();
  }

  ngOnInit(): void {
    combineLatest([this.links$, this.currentState$])
      .pipe(
        untilComponentDestroyed(this),
        filter(([links, currentState]) => !!links && !!currentState)
      )
      .subscribe(
        ([
          links,
          {
            source: { id: sourceId },
            target: { id: targetId },
          },
        ]) => {
          this.currentLink = links.find(
            ({ target, source }) => target === targetId && source === sourceId
          );
        }
      );
  }

  private _getNodes(): Observable<Node[]> {
    return combineLatest([this._nodes$, this.currentState$]).pipe(
      untilComponentDestroyed(this),
      map(([nodes, currentState]) => {
        if (!currentState) {
          return nodes;
        }

        const {
          source: { id: sourceId },
          target: { id: targetId },
        } = currentState;

        return nodes.map((node) => ({
          ...node,
          data: {
            customColor:
              node.id === targetId || node.id === sourceId
                ? COLOR.CURRENT
                : node.data.customColor,
          },
        }));
      })
    );
  }
}
