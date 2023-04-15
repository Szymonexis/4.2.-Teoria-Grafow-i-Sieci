import { Injectable } from '@angular/core';
import { Link, Node, PresentationState } from '../state/graph/graph.model';

@Injectable()
export class BellmanFordService {
  compute(
    sourceId: Node['id'],
    nodes: Node[],
    links: Link[]
  ): PresentationState[] {
    const distances: { [key: Node['id']]: number } = {};
    const previous: { [key: Node['id']]: Node['id'] } = {};

    const presentationStates: PresentationState[] = [];

    // Set all distances to Infinity except for the source node
    nodes.forEach(({ id: nodeId }) => {
      distances[nodeId] = nodeId === sourceId ? 0 : Infinity;
      previous[nodeId] = undefined;
    });

    // Relax edges repeatedly
    nodes.forEach((_) => {
      links.forEach(
        ({ source: sourceNodeId, target: targetNodeId, data: { cost } }) => {
          presentationStates.push(
            this._getPresentationState(
              sourceNodeId,
              targetNodeId,
              { ...distances },
              nodes
            )
          );

          const distanceToTarget = distances[sourceNodeId] + cost;
          if (distanceToTarget < distances[targetNodeId]) {
            distances[targetNodeId] = distanceToTarget;
            previous[targetNodeId] = sourceNodeId;
          }
        }
      );
    });

    // Check for negative cycles
    links.forEach(({ source, target, data: { cost } }) => {
      const distanceToTarget = distances[source] + cost;
      if (distanceToTarget < distances[target]) {
        throw new Error('Negative cycle detected');
      }
    });

    return presentationStates;
  }

  private _getPresentationState(
    sourceId: string,
    targetId: string,
    distances: Record<Node['id'], number>,
    nodes: Node[]
  ): PresentationState {
    return {
      source: nodes.find(({ id }) => sourceId === id),
      target: nodes.find(({ id }) => targetId === id),
      matrix: distances,
    };
  }
}
