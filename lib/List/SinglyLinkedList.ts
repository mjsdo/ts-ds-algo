import type { Nullable } from '../utils/types';

export class Node<T> {
  // eslint-disable-next-line no-use-before-define
  next: Nullable<Node<T>> = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export default class SinglyLinkedList<T> {
  head: Nullable<Node<T>> = null;
  tail: Nullable<Node<T>> = null;

  find(
    predicate: (node: Node<T>) => boolean,
    startNode: Nullable<Node<T>> = null,
  ) {
    let curNode = startNode || this.head;

    while (curNode) {
      if (predicate(curNode)) {
        return curNode;
      }

      curNode = curNode.next;
    }

    return null;
  }

  /** `tail`에 삽입 */
  append(value: T) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  /** `head`에 삽입 */
  prepend(value: T) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    return this;
  }

  /** `node`의 `next`에 삽입 */
  insertAfter(node: Nullable<Node<T>>, value: T) {
    if (!node) return this;

    const newNode = new Node(value);

    newNode.next = node.next;
    node.next = newNode;

    return this;
  }

  /** `startNode`부터 순회하면서 `predicate`을 가장 먼저 만족하는 노드를 삭제 */
  remove(
    predicate: (node: Node<T>) => boolean,
    startNode: Nullable<Node<T>> = null,
  ) {
    let curNode = startNode || this.head;

    while (curNode) {
      if (predicate(curNode)) {
        return this.removeByNode(curNode);
      }

      curNode = curNode.next;
    }

    return undefined;
  }

  removeByNode(node?: Nullable<Node<T>>) {
    if (!node) {
      return undefined;
    }

    if (node === this.head && this.head === this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }

    if (node === this.head) {
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }

    const value = node.value;
    let prevNode = this.head;
    while (prevNode && prevNode.next !== node) {
      prevNode = prevNode.next;
    }

    if (prevNode) prevNode.next = node.next;
    if (node === this.tail) this.tail = prevNode;
    return value;
  }

  removeHeadNode() {
    this.removeByNode(this.head);
  }

  removeTailNode() {
    this.removeByNode(this.tail);
  }
}
