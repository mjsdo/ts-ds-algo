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

  find(value: T) {
    let curNode = this.head;

    while (curNode && curNode.value !== value) {
      curNode = curNode.next;
    }
    return curNode;
  }

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

  insert(node: Nullable<Node<T>>, value: T) {
    if (!node) return this;

    const newNode = new Node(value);

    newNode.next = node.next;
    node.next = newNode;

    return this;
  }

  remove(value: T) {
    let prevNode = this.head;

    if (!prevNode) return undefined;

    // prevNode === head
    if (this.head && this.head.value === value) {
      const temp = this.head;

      this.head = this.head.next;
      temp.next = null;

      return value;
    }

    while (prevNode.next && prevNode.next.value !== value) {
      prevNode = prevNode.next;
    }

    if (prevNode.next !== null) {
      const deletedValue = prevNode.next.value;

      prevNode.next = prevNode.next.next;
      return deletedValue;
    }

    return undefined;
  }

  toString() {
    let curNode = this.head;
    let output = '[\n';

    while (curNode !== null) {
      output += `${JSON.stringify(curNode.value)}\n`;
      curNode = curNode.next;
    }
    output += ']';
    return output;
  }
}
