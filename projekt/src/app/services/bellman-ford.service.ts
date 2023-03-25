import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { GraphFacade } from '../state/graph/graph.facade';
import { COLOR, Id, Link, Node, uuid } from '../state/graph/graph.model';
import { SimulationFacade } from '../state/simulation/simulation.facade';
import {
  BellmanFordEdge,
  SimulationStep,
  SimulationGraph,
  IdTranslation,
  SimulationData,
  Distances,
} from '../state/simulation/simulation.model';

@Injectable({
  providedIn: 'root',
})
export class BellmanFordService {
  private _vertices: number = 0;
  private _nodes: Node[] = [];
  private _graph: BellmanFordEdge[] = [];
  private _source: Id = '';

  private _hasSource$ = new BehaviorSubject<boolean>(false);
  private _isInitalized$ = new BehaviorSubject<boolean>(false);

  private _isInitializedSubscription: Subscription;

  // @TODO: add steps which can be given back to store at controlled manner
  private _simulationSteps: SimulationStep[];
  private _algoSimulationGraph: SimulationGraph;
  private _idsTranslations: IdTranslation[];

  constructor(
    private graphFacade: GraphFacade,
    private simulationFacade: SimulationFacade
  ) {}

  init(): void {
    combineLatest([
      this.graphFacade.links$,
      this.graphFacade.nodes$,
      this.graphFacade.source$,
    ]).subscribe(([links, nodes, source]) => {
      if (!source || !links.length || !nodes.length) {
        return;
      }

      this._source = source.id;
      this._vertices = nodes.length;
      this._nodes = cloneDeep(nodes);

      links.forEach(({ id, target, source, data: { cost } }) => {
        this._addEdge({ id, target, source, cost });
      });

      this._isInitalized$.next(true);
    });
  }

  compute(): void {
    this._isInitializedSubscription = this._isInitalized$.subscribe(
      (_isInitalized) => {
        if (!_isInitalized) {
          return;
        }

        const simulationData = this._algo();

        this.simulationFacade.setSimulationData(simulationData);
      }
    );
  }

  // @TODO: add types
  reset() {
    this._isInitalized$.next(false);
    this._hasSource$.next(false);

    if (this._isInitializedSubscription) {
      this._isInitializedSubscription.unsubscribe();
    }

    this._algoSimulationGraph = null;
    this._simulationSteps = [];

    this._nodes = [];
    this._graph = [];
    this._vertices = 0;
    this._source = '';
  }

  private _algo(): SimulationData {
    const infinity = Number.POSITIVE_INFINITY;

    const distances: Distances = this._nodes.reduce<Distances>(
      (acc, { id }) => {
        return { ...acc, [id]: infinity };
      },
      {}
    );

    distances[this._source] = 0;

    this._algoSimulationGraph = this._getAlgoSimulationGraph(distances);

    for (let i = 0; i < this._vertices - 1; i++) {
      this._graph.forEach(({ source, target, cost }) => {
        if (
          distances[source] !== infinity &&
          distances[source] + cost < distances[target]
        ) {
          distances[target] = distances[source] + cost;

          this._simulationSteps.push({
            source: this._source,
            target,
            cost: distances[source] + cost,
          });
        }
      });
    }

    this._graph.forEach(({ source, target, cost }) => {
      if (
        distances[source] !== infinity &&
        distances[source] + cost < distances[target]
      ) {
        throw new Error('Graph contains negative weight cycle!');
      }
    });

    this._printSolution(distances);

    const simulationGraph = this._algoSimulationGraph;
    const simulationSteps = this._simulationSteps.map(
      ({ source, target, cost }) => ({
        source: this._idsTranslations.find(({ oldId }) => oldId === source)
          .newId,
        target: this._idsTranslations.find(({ oldId }) => oldId === target)
          .newId,
        cost,
      })
    );

    return { simulationGraph, simulationSteps };
  }

  private _addEdge(edge: BellmanFordEdge): void {
    this._graph = [...this._graph, edge];
  }

  private _getAlgoSimulationGraph(distances: Distances): {
    nodes: Node[];
    links: Link[];
  } {
    const idsTranslations: IdTranslation[] = [];

    const nodes: Node[] = Object.keys(distances).map((nodeId) => {
      const node = this._nodes.find(({ id }) => id === nodeId);
      const newId = uuid();

      idsTranslations.push({ oldId: node.id, newId });

      return {
        ...cloneDeep(node),
        id: newId,
        data: {
          customColor: COLOR.UNSOLVED,
        },
      };
    });

    this._idsTranslations = idsTranslations;

    const sourceNewId = idsTranslations.find(
      ({ oldId }) => oldId === this._source
    ).newId;

    const links: Link[] = nodes.map(({ id }) => ({
      id: uuid(),
      source: sourceNewId,
      target: id,
      data: {
        cost: id === sourceNewId ? 0 : Number.POSITIVE_INFINITY,
        customColor: COLOR.BLACK,
      },
    }));

    return { nodes, links };
  }

  private _printSolution(distances: Distances): void {
    console.log('Vertex distance from source');

    Object.entries(distances).forEach(([node, distance]) => {
      console.log({ node, distance });
    });
  }
}
