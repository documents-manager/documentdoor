import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {FlatTreeNode, TreeNode} from "../../models";
import { Store } from '@ngrx/store';
import { search, searchQuery } from 'src/app/state/search/search.actions';

@Component({
  selector: 'app-tree-nav',
  templateUrl: './tree-nav.component.html',
  styleUrls: ['./tree-nav.component.scss']
})
export class TreeNavComponent implements OnChanges {
  @Input() data!: TreeNode[] | undefined;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<TreeNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<TreeNode, FlatTreeNode>;
  expandedState: {[prop: string]: boolean} = {
    Labels: false,
    Epics: false
  }
  constructor(private readonly store: Store,) {
    this.treeFlattener = new MatTreeFlattener(
        this.transformer,
        this.getLevel,
        this.isExpandable,
        this.getChildren);
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.data ?? [];
  }

  ngOnChanges(changes: SimpleChanges): void {
        if (changes.data?.currentValue) {
          this.updateDataSource(changes.data?.currentValue);
        }
    }

  /** Transform the data to something the tree can read. */
  transformer(node: TreeNode, level: number): FlatTreeNode {
    return {
      name: node.name,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: TreeNode): TreeNode[] | null | undefined {
    return node.children;
  }

  /** Inverts the expanded state */
  expandedChange(node: FlatTreeNode) {
    this.expandedState[node.name] = (!this.expandedState[node.name] ?? false)
  }

  /** Method that updates the data source*/
  public updateDataSource(dataObjects: any) {

    // save node's expanded state
    const expandedNodesIds: string[] = [];
    if (this.treeControl.dataNodes) {
      this.treeControl.dataNodes.forEach((node: FlatTreeNode) => {
        if (this.treeControl.isExpandable(node) && this.treeControl.isExpanded(node)) {
          expandedNodesIds.push(node.name);
        }
      });
    }

    // update data source
    this.dataSource.data = dataObjects;

    // restore node's expanded state
    this.treeControl.dataNodes
        .filter(node => this.isActive(node) || expandedNodesIds.find(id => id === node.name))
        .forEach(nodeToExpand => {
          this.expandNode(nodeToExpand);
        });
  }

  /** Method that expands the node (if not a leave) and its parent nodes (if any) using the TreeControl */
  private expandNode(treeNode: FlatTreeNode | undefined): void {
    if (!treeNode) {
      return;
    }

    if (this.treeControl.isExpandable(treeNode)) {
      this.treeControl.expand(treeNode);
    }
  }

  private isActive(node: FlatTreeNode) {
    return this.expandedState[node.name] ?? false;
  }

  clickedNode(node: FlatTreeNode) {
    if (!node.expandable) {
      this.store.dispatch(searchQuery({query: node.name}))
      this.store.dispatch(search());
    }
  }
}
