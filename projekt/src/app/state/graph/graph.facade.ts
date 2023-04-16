import { select, Store } from '@ngrx/store';
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
import { AppState } from '..';

import * as selectors from './graph.selectors';
import * as actions from './graph.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class GraphFacade {
  nodes$ = this.store.pipe(select(selectors.selectNodes));
  links$ = this.store.pipe(select(selectors.selectLinks));
  source$ = this.store.pipe(select(selectors.selectSource));
  currentPresentationState$ = this.store.pipe(
    select(selectors.selectCurrentPresentationState)
  );
  presentationStatesWithCurrentIndex$ = this.store.pipe(
    select(selectors.selectPresentationStatesWithCurrentIndex)
  );

  constructor(private store: Store<AppState>) {}

  pickCurrentPresentationState(
    payload: CurrentPresentationStateIndexPayload
  ): void {
    this.store.dispatch(actions.pickCurrentPresentationState(payload));
  }

  setPresentationStates(payload: PresentationStatesPayload): void {
    this.store.dispatch(actions.setPresentationStates(payload));
  }

  setNodesAndLinksTemplate(payload: NodesAndLinksTemplatePayload): void {
    this.store.dispatch(actions.setNodesAndLinksTemplate(payload));
  }

  setAlgoSourceNode(payload: NodePayload): void {
    this.store.dispatch(actions.setAlgoSourceNode(payload));
  }

  createNode(payload: CreateNodePayload): void {
    this.store.dispatch(actions.createNode(payload));
  }

  editNode(payload: EditNodePayload): void {
    this.store.dispatch(actions.editNode(payload));
  }

  deleteNode(payload: DeleteNodePayload): void {
    this.store.dispatch(actions.deleteNode(payload));
  }

  createLink(payload: CreateLinkPayload): void {
    this.store.dispatch(actions.createLink(payload));
  }

  editLink(payload: EditLinkPayload): void {
    this.store.dispatch(actions.editLink(payload));
  }

  deleteLink(payload: DeleteLinkPayload): void {
    this.store.dispatch(actions.deleteLink(payload));
  }
}
