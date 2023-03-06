import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { GraphFacade } from 'src/app/state/graph/graph.facade';
import {
  COLOR,
  Id,
  Link,
  Node,
  NodesAndLinksTemplate,
  nodesAndLinksTemplates,
} from 'src/app/state/graph/graph.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  nodes$ = this.graphFacade.nodes$;
  links$ = this.graphFacade.links$;
  source$ = this.graphFacade.source$;

  nodesAndLinksTemplates = nodesAndLinksTemplates;

  createNodeForm!: FormGroup;
  deleteNodeForm!: FormGroup;
  createLinkForm!: FormGroup;
  deleteLinkForm!: FormGroup;

  constructor(
    private graphFacade: GraphFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createNodeForm = this.formBuilder.group({
      nodeLabel: new FormControl(null, [Validators.required]),
    });

    this.deleteNodeForm = this.formBuilder.group({
      node: new FormControl(null, [Validators.required]),
    });

    this.createLinkForm = this.formBuilder.group({
      source: new FormControl(null, [Validators.required]),
      target: new FormControl(null, [Validators.required]),
      cost: new FormControl(5, [Validators.required]),
    });

    this.deleteLinkForm = this.formBuilder.group({
      link: new FormControl(null, [Validators.required]),
    });
  }

  onSourceSelect(source: Node): void {
    if (!source) {
      return;
    }

    this.graphFacade.setAlgoSourceNode({ source });
  }

  onTemplateSelect(template: NodesAndLinksTemplate): void {
    this.graphFacade.setNodesAndLinksTemplate(template);
  }

  onSubmitCreateNode(createNodeForm: FormGroup): void {
    const nodeLabel = createNodeForm.controls['nodeLabel'].value as string;

    if (!nodeLabel || nodeLabel === '') {
      return;
    }

    this.graphFacade.createNode({
      label: nodeLabel,
      data: { customColor: COLOR.UNSOLVED },
    });

    this._formCleanupRoutine(this.createNodeForm);
  }

  onSubmitDeleteNode(deleteNodeForm: FormGroup): void {
    const nodeToDelete = deleteNodeForm.controls['node'].value as Node;

    if (!nodeToDelete) {
      return;
    }

    this.graphFacade.deleteNode({ id: nodeToDelete.id });

    this._formCleanupRoutine(this.deleteNodeForm);
  }

  onSubmitCreateLink(createLinkForm: FormGroup): void {
    const sourceNode = createLinkForm.controls['source'].value as Node;
    const targetNode = createLinkForm.controls['target'].value as Node;
    const linkCost = createLinkForm.controls['cost'].value as number;

    if (!sourceNode || !targetNode) {
      return;
    }

    this.graphFacade.createLink({
      source: sourceNode.id,
      target: targetNode.id,
      data: { customColor: COLOR.BLACK, cost: linkCost },
    });

    this._formCleanupRoutine(this.createLinkForm, {
      cost: 5,
    });
  }

  onSubmitDeleteLink(deleteLinkForm: FormGroup): void {
    const linkToDelete = deleteLinkForm.controls['link'].value as Link;

    if (!linkToDelete) {
      return;
    }

    this.graphFacade.deleteLink({ id: linkToDelete.id });

    this._formCleanupRoutine(this.deleteLinkForm);
  }

  getNodeById(nodeId: Id, nodes: Node[]): Node {
    return nodes.find(({ id }) => id === nodeId);
  }

  private _formCleanupRoutine(formGroup: FormGroup, resetValues?: any): void {
    formGroup.reset(resetValues);
    formGroup.markAsPristine();
    formGroup.markAsUntouched();
    formGroup.updateValueAndValidity();
  }
}
