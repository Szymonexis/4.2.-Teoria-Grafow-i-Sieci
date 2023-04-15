import { createAction, props } from '@ngrx/store';
import {
  CreateLinkPayload,
  CreateNodePayload,
  CurrentPresentationStateIndexPayload,
  DeleteLinkPayload,
  DeleteNodePayload,
  EditLinkPayload,
  EditNodePayload,
  NodePayload,
  NodesAndLinksTemplatePayload,
  PresentationStatesPayload,
} from './graph.model';

export const setNodesAndLinksTemplate = createAction(
  '[Graph] Set nodes and links template',
  props<NodesAndLinksTemplatePayload>()
);

export const pickCurrentPresentationState = createAction(
  '[Graph] Pick current presentation state',
  props<CurrentPresentationStateIndexPayload>()
);

export const setPresentationStates = createAction(
  '[Graph] Set algo output presentation states',
  props<PresentationStatesPayload>()
);

export const setAlgoSourceNode = createAction(
  '[Graph] Set algo source node',
  props<NodePayload>()
);

export const createNode = createAction(
  '[Graph] Create new node',
  props<CreateNodePayload>()
);

export const editNode = createAction(
  '[Graph] Edit node',
  props<EditNodePayload>()
);

export const deleteNode = createAction(
  '[Graph] Delete node',
  props<DeleteNodePayload>()
);

export const createLink = createAction(
  '[Graph] Create new link',
  props<CreateLinkPayload>()
);

export const editLink = createAction(
  '[Graph] Edit link',
  props<EditLinkPayload>()
);

export const deleteLink = createAction(
  '[Graph] Delete link',
  props<DeleteLinkPayload>()
);

export const colorShow = createAction('[Test] Color Show');
