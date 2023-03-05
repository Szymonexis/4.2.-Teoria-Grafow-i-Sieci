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

  nodesAndLinksTemplates = nodesAndLinksTemplates;

  nodeForm!: FormGroup;
  linkForm!: FormGroup;

  constructor(
    private graphFacade: GraphFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nodeForm = this.formBuilder.group({
      nodeLabel: new FormControl(''),
    });

    this.linkForm = this.formBuilder.group({
      source: new FormControl(null, [Validators.required]),
      target: new FormControl(null, [Validators.required]),
      cost: new FormControl(5, [Validators.required]),
    });
  }

  onSourceSelect(source: Node): void {
    // @TODO: to be sent to store
    console.log({ source });
  }

  onTemplateSelect(template: NodesAndLinksTemplate): void {
    this.graphFacade.setNodesAndLinksTemplate(template);
  }

  onSubmitCreateNode(nodeForm: FormGroup): void {
    const nodeLabel = (nodeForm.controls['nodeLabel'] as FormControl)
      .value as string;

    if (nodeLabel === '') {
      return;
    }

    this.graphFacade.createNode({
      label: nodeLabel,
      data: { customColor: COLOR.UNSOLVED },
    });

    this.nodeForm.reset();
  }

  onSubmitCreateLink(linkForm: FormGroup): void {
    const sourceNode = linkForm.controls['source'].value as Node;
    const targetNode = linkForm.controls['target'].value as Node;
    const linkCost = linkForm.controls['cost'].value as number;

    if (!sourceNode || !targetNode) {
      return;
    }

    this.graphFacade.createLink({
      source: sourceNode.id,
      target: targetNode.id,
      data: { customColor: COLOR.BLACK, cost: linkCost },
    });

    this.linkForm.reset();
  }
}
