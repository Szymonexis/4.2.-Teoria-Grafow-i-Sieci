import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';
import { GraphFacade } from 'src/app/state/graph/graph.facade';
import { COLOR, Link, Node } from 'src/app/state/graph/graph.model';

@Component({
  selector: 'app-graph-space',
  templateUrl: './graph-space.component.html',
  styleUrls: ['./graph-space.component.scss'],
})
export class GraphSpaceComponent extends OnDestroyMixin implements OnInit {
  currentState$ = this.graphFacade.currentPresentationState$;
  currentLink$ = new BehaviorSubject(null);
  Infinity = Infinity;

  _links$ = this.graphFacade.links$;
  links$ = this._getLinks();

  _nodes$ = this.graphFacade.nodes$;
  nodes$ = this._getNodes();

  get linkBackgroundColor(): string {
    return COLOR.CURRENT_LINK;
  }

  get nodeBackgroundColor(): string {
    return COLOR.CURRENT_NODE;
  }

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
          this.currentLink$.next(
            links.find(
              ({ target, source }) => target === targetId && source === sourceId
            )
          );
        }
      );
  }

  private _getLinks(): Observable<Link[]> {
    return combineLatest([this._links$, this.currentLink$]).pipe(
      untilComponentDestroyed(this),
      map(([links, currentLink]) => {
        if (!currentLink) {
          return links;
        }

        return links.map(({ id, ...link }) => ({
          ...link,
          id,
          data: {
            ...link.data,
            customColor:
              id === currentLink.id
                ? COLOR.CURRENT_LINK
                : link.data.customColor,
          },
        }));
      })
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
                ? COLOR.CURRENT_NODE
                : node.data.customColor,
          },
        }));
      })
    );
  }
}
