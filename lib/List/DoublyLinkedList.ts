import type { Nullable } from '../utils/types';

export class Node<T> {
  // eslint-disable-next-line no-use-before-define
  prev: Nullable<Node<T>> = null;
  next: Nullable<Node<T>> = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export default class DoublyLinkedList<T> {
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
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    return this;
  }

  /** `head`에 삽입 */
  prepend(value: T) {
    const newNode = new Node(value);

    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      return this;
    }

    this.head = newNode;
    this.tail = newNode;

    return this;
  }

  /** `node`의 `next`에 삽입 */
  insertAfter(node: Nullable<Node<T>>, value: T) {
    if (!node) return this;

    const newNode = new Node(value);

    if (node.next) {
      newNode.next = node.next;
      node.next.prev = newNode;
    }

    newNode.prev = node;
    node.next = newNode;

    return this;
  }

  /** `node`의 `prev`에 삽입 */
  insertBefore(node: Nullable<Node<T>>, value: T) {
    if (!node) return this;

    const newNode = new Node(value);

    if (node.prev) {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    }

    newNode.next = node;
    node.prev = newNode;

    return this;
  }

  /** `startNode`부터 순회하면서 `predicate`을 가장 먼저 만족하는 노드를 삭제 */
  remove(
    predicate: (node: Node<T>) => boolean,
    startNode: Nullable<Node<T>> = null,
    reverseDirection = false,
  ) {
    let curNode = startNode || this.head;
    const direction = reverseDirection ? 'prev' : 'next';

    while (curNode) {
      if (predicate(curNode)) {
        return this.removeByNode(curNode);
      }
      curNode = curNode[direction];
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
      this.head!.prev = null;
      return value;
    }

    if (node === this.tail) {
      const value = this.tail.value;
      this.tail = this.tail.prev;
      this.tail!.next = null;
      return value;
    }

    const value = node.value;
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    return value;
  }

  removeTailNode() {
    return this.removeByNode(this.tail);
  }

  removeHeadNode() {
    return this.removeByNode(this.head);
  }
}
