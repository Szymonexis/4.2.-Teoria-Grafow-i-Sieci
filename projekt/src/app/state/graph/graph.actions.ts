import { createAction, props } from '@ngrx/store';
import {
  CreateLinkPayload,
  CreateNodePayload,
  DeleteLinkPayload,
  DeleteNodePayload,
  EditLinkPayload,
  EditNodePayload,
  NodesAndLinksTemplatePayload,
} from './graph.model';

export const setNodesAndLinksTemplate = createAction(
  '[Graph] Set nodes and links template',
  props<NodesAndLinksTemplatePayload>()
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
