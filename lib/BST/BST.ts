class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

type NodeEdgeDirection = Extract<keyof Node<unknown>, 'left' | 'right'>;

type BSTCompareResult =
  | typeof BST.EQ
  | typeof BST.LEFT_IS_GT
  | typeof BST.RIGHT_IS_GT;

const defaultCompareFn = (a: any, b: any) => {
  if (a < b) return BST.RIGHT_IS_GT;
  if (a > b) return BST.LEFT_IS_GT;
  return BST.EQ;
};

export default class BST<T> {
  root: Node<T> | null = null;
  static readonly EQ = Symbol();
  static readonly LEFT_IS_GT = Symbol();
  static readonly RIGHT_IS_GT = Symbol();

  static RIGHT_IS_GT_OR_EQ(result: BSTCompareResult) {
    return result === BST.EQ || result === BST.RIGHT_IS_GT;
  }

  static LEFT_IS_GT_OR_EQ(result: BSTCompareResult) {
    return result === BST.EQ || result === BST.LEFT_IS_GT;
  }

  private compareFn: (a: T, b: T) => BSTCompareResult;

  constructor(compareFn: (a: T, b: T) => BSTCompareResult = defaultCompareFn) {
    this.compareFn = compareFn;
  }

  private _add(value: T, subTree: Node<T>) {
    const compareResult = this.compareFn(subTree.value, value);
    const direction: NodeEdgeDirection = BST.RIGHT_IS_GT_OR_EQ(compareResult)
      ? 'right'
      : 'left';

    if (!subTree[direction]) {
      subTree[direction] = new Node(value);
      return;
    }

    this._add(value, subTree[direction] as Node<T>);
    return;
  }

  add(value: T) {
    if (this.root === null) {
      this.root = new Node(value);
      return this;
    }

    this._add(value, this.root);
    return this;
  }

  has(value: T) {
    if (!this.root) {
      return false;
    }

    let node = this.root;

    while (true) {
      const compareResult = this.compareFn(node.value, value);

      if (compareResult === BST.EQ) return true;

      const direction: NodeEdgeDirection =
        compareResult === BST.RIGHT_IS_GT ? 'right' : 'left';

      if (!node[direction]) return false;
      node = node[direction]!;
    }
  }

  private findNode(
    value: T,
    subTree: Node<T>,
    subTreeParent?: Node<T>,
  ): { node: Node<T>; parentNode: Node<T> | undefined } | undefined {
    const compareResult = this.compareFn(subTree.value, value);
    if (compareResult === BST.EQ)
      return { node: subTree, parentNode: subTreeParent };

    const direction: NodeEdgeDirection =
      compareResult === BST.RIGHT_IS_GT ? 'right' : 'left';

    const nextSubTree = subTree[direction];
    if (!nextSubTree) return undefined;

    return this.findNode(value, nextSubTree, subTree);
  }

  private deleteLeafNode(node: Node<T>, parentNode: Node<T> | undefined) {
    if (node === this.root) this.root = null;
    else if (parentNode!.left === node) parentNode!.left = null;
    else parentNode!.right = null;
  }

  private linkParentToChild(
    node: Node<T>,
    parentNode: Node<T>,
    childNode: Node<T> | null,
  ) {
    if (parentNode.left === node) parentNode.left = childNode;
    if (parentNode.right === node) parentNode.right = childNode;
  }

  private deleteNodeHasOneChild(
    node: Node<T>,
    parentNode: Node<T> | undefined,
  ) {
    const childNode = node.left ? node.left : node.right;

    if (node === this.root)
      /* parentNode === undefined */ this.root = childNode;
    else this.linkParentToChild(node, parentNode!, childNode!);
  }

  private deleteNodeHasTwoChild(node: Node<T>) {
    const found = this.findNextValueNode(node);

    if (!found) {
      throw new Error(`${node}의 자식 노드가 두개여야 합니다.`);
    }

    const { node: nextValueNode, parentNode: nextValueNodeParent } = found;

    // nextValueNode의 자식노드와 부모노드를 연결
    this.linkParentToChild(
      nextValueNode,
      nextValueNodeParent,
      nextValueNode.right,
    );

    // node와 nextValueNode 교체
    node.value = nextValueNode.value;
  }

  private findNextValueNode(node: Node<T>) {
    if (!node.right) return undefined;

    let parentNode = node;
    let curNode = node.right;
    while (curNode.left) {
      parentNode = curNode;
      curNode = curNode.left;
    }
    return { node: curNode, parentNode };
  }

  delete(value: T) {
    const { root } = this;
    if (!root) return this;

    const found = this.findNode(value, root);
    if (!found) return this;

    const { node, parentNode } = found;

    if (!node.left && !node.right) {
      this.deleteLeafNode(node, parentNode);
      return this;
    }

    if (node.left && node.right) {
      this.deleteNodeHasTwoChild(node);
      return this;
    }

    this.deleteNodeHasOneChild(node, parentNode);
    return this;
  }

  toArray() {
    if (this.root) return [...this.preorderTraverse(this.root)];
    return [];
  }

  private *preorderTraverse(node: Node<T>): Generator<T, void, unknown> {
    if (node.left) yield* this.preorderTraverse(node.left);
    yield node.value;
    if (node.right) yield* this.preorderTraverse(node.right);
  }
}
