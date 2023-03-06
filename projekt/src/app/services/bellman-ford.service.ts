import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { GraphFacade } from '../state/graph/graph.facade';
import { Id, Node } from '../state/graph/graph.model';

export interface BellmanFordEdge {
  id: Id;
  source: Id;
  target: Id;
  cost: number;
}

export interface Distances {
  [key: Id]: number;
}

@Injectable({
  providedIn: 'root',
})
export class BellmanFordService {
  private _vertices: number = 0;
  private _nodes: Node[] = [];
  private _graph: BellmanFordEdge[] = [];
  private _source: Id;

  private _hasSource$ = new BehaviorSubject<boolean>(false);
  private _isInitalized$ = new BehaviorSubject<boolean>(false);
  private _isComputed$ = new BehaviorSubject<boolean>(false);
  private _steps: BellmanFordEdge[] = [];

  constructor(private graphFacade: GraphFacade) {}

  init(): void {
    this.graphFacade.source$.subscribe((source) => {
      if (!source) {
        return;
      }

      this._source = source.id;
      this._hasSource$.next(true);
    });

    combineLatest([
      this.graphFacade.links$,
      this.graphFacade.nodes$,
      this._hasSource$,
    ]).subscribe(([links, nodes, _hasSource]) => {
      if (!links.length || !nodes.length) {
        return;
      }

      this._vertices = links.length;

      this._nodes = cloneDeep(nodes);

      links.forEach(({ id, target, source, data: { cost } }) => {
        this._addEdge({ id, target, source, cost });
      });

      this._isInitalized$.next(_hasSource && true);
    });
  }

  compute(): void {
    if (!this._isInitalized$.value) {
      return;
    }

    const infinity = Number.POSITIVE_INFINITY;

    const distances: Distances = this._nodes.reduce<Distances>(
      (acc, { id }) => {
        return { ...acc, [id]: infinity };
      },
      {}
    );

    distances[this._source] = 0;

    new Array(this._vertices - 1).forEach((_) => {
      this._graph.forEach(({ source, target, cost }) => {
        if (
          distances[source] !== infinity &&
          distances[source] + cost < distances[target]
        ) {
          distances[target] = distances[target] + cost;
        }
      });
    });

    this._graph.forEach(({ source, target, cost }) => {
      if (
        distances[source] !== infinity &&
        distances[source] + cost < distances[target]
      ) {
        throw new Error('Graph contains negative weight cycle!');
      }
    });

    this._isComputed$.next(true);

    this._printSolution(distances);
  }

  reset(): void {
    this._isComputed$.next(false);
    this._isInitalized$.next(false);
    this._hasSource$.next(false);
  }

  private _addEdge(edge: BellmanFordEdge): void {
    this._graph = [...this._graph, edge];
  }

  private _printSolution(distances: Distances): void {
    console.log('Vertex distance from source');

    Object.entries(distances).forEach(([node, distance]) => {
      console.log({ node, distance });
    });
  }
}
