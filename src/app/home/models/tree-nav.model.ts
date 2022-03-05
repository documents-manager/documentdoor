/** Tree node data with possible child nodes. */
export interface TreeNode {
    name: string;
    children?: TreeNode[];
}

/**
 * Flattened tree node that has been created from a TreeNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
    name: string;
    level: number;
    expandable: boolean;
}