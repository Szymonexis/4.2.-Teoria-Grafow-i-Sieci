import { v4 as uudi } from 'uuid';

export type Id = string;

export enum COLOR {
  CURRENT = '#ff0000',
  SOLVED = '#00ff00',
  UNSOLVED = '#0000ff',
  BLACK = '#000000'
}

export interface Data {
  color: COLOR;
}

export interface Link {
  id: Id;
  source: Id;
  target: Id;
  data: Data;
}

export interface Node {
  id: Id;
  label: string;
  data: Data;
}

export interface GraphState {
  nodes: Node[];
  links: Link[];
}

export const initialState: GraphState = {
  nodes: [],
  links: [],
};

export type CreateNodePayload = Omit<Node, 'id'>;

export type EditNodePayload = Node;

export type DeleteNodePayload = Pick<Node, 'id'>;

export type CreateLinkPayload = Omit<Link, 'id'>;

export type EditLinkPayload = Link;

export type DeleteLinkPayload = Pick<Link, 'id'>;

export type NodesAndLinksTemplatePayload = GraphState;

export interface NodesAndLinksTemplates {
  [key: string]: GraphState;
}

const _generateNodes = (labels: string[]): Node[] =>
  labels.map((label) => ({
    id: uudi(),
    label,
    data: { color: COLOR.UNSOLVED },
  }));

// const _generateLinks = (nodes: Node[]): Link[] => 

export const nodesAndLinksTemplates: NodesAndLinksTemplates = {
  template1: {
    nodes: _generateNodes(['A', 'B', 'C', 'D']),
    links: [],
  },
};
