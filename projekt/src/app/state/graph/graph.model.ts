import ShortUniqueId from 'short-unique-id';

export type Id = string;

const uid = new ShortUniqueId({ length: 10, dictionary: 'alpha' });

export enum COLOR {
  CURRENT = '#e9c46a',
  SOLVED = '#2a9d8f',
  UNSOLVED = '#e76f51',
  BLACK = '#000000',
}

export interface Data {
  customColor: COLOR;
}

export interface LinkData extends Data {
  cost: number;
}

export interface NodeData extends Data {}

export interface Link {
  id: Id;
  source: Id;
  target: Id;
  data: LinkData;
}

export interface Node {
  id: Id;
  label: string;
  data: NodeData;
}

export interface GraphState {
  nodes: Node[];
  links: Link[];
  source: Node;
}

export const initialState: GraphState = {
  nodes: [],
  links: [],
  source: null,
};

export interface NodePayload {
  source: Node;
}

export type CreateNodePayload = Omit<Node, 'id'>;

export type EditNodePayload = Node;

export type DeleteNodePayload = Pick<Node, 'id'>;

export type CreateLinkPayload = Omit<Link, 'id'>;

export type EditLinkPayload = Link;

export type DeleteLinkPayload = Pick<Link, 'id'>;

export type NodesAndLinksTemplatePayload = Omit<GraphState, 'source'>;

export type NodesAndLinksTemplate = Omit<GraphState, 'source'>;

export interface NodesAndLinksTemplates {
  [key: string]: NodesAndLinksTemplate;
}

export const uuid = () => uid();

const _generateNodes = (labels: string[]): Node[] =>
  [...new Set(labels.map((label) => label.toUpperCase().trim()))].map(
    (label) => ({
      id: label,
      label,
      data: { customColor: COLOR.UNSOLVED },
    })
  );

const _generateLinks = (connections: {
  [key: string]: { target: string; cost: number }[];
}): Link[] =>
  Object.keys(connections)
    .map((source) => source.toUpperCase().trim())
    .map<Link[]>((source) =>
      connections[source]
        .map(({ target, cost }) => ({
          target: target.toUpperCase().trim(),
          cost,
        }))
        .map<Link>(({ target, cost }) => ({
          id: uuid(),
          source,
          target,
          data: {
            customColor: COLOR.BLACK,
            cost,
          },
        }))
    )
    .flat();

export const nodesAndLinksTemplates: NodesAndLinksTemplates = {
  'Template 1': {
    nodes: _generateNodes(['A', 'B', 'C', 'D']),
    links: _generateLinks({
      A: [
        { target: 'B', cost: 3 },
        { target: 'C', cost: 1 },
      ],
      B: [
        { target: 'A', cost: 9 },
        { target: 'C', cost: 2 },
      ],
      C: [
        { target: 'D', cost: 3 },
        { target: 'A', cost: 13 },
      ],
      D: [
        { target: 'B', cost: 6 },
        { target: 'A', cost: 2 },
        { target: 'C', cost: 1 },
      ],
    }),
  },
};