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

  find(predicate: (node: Node<T>) => boolean, startNode?: Node<T>) {
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

  /** `head`부터 순회하면서 `predicate`을 가장 먼저 만족하는 노드를 삭제 */
  remove(predicate: (node: Node<T>) => boolean) {
    if (!this.head) {
      return undefined;
    }

    if (predicate(this.head)) {
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }

    let prevNode = this.head;
    let curNode = this.head.next;

    while (curNode) {
      if (predicate(curNode)) {
        prevNode.next = curNode.next;
        return curNode.value;
      }

      curNode = curNode.next;
    }

    return undefined;
  }
}
