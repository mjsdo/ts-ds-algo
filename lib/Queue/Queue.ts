import type { Nullable } from 'lib/utils/types';

export class Node<T> {
  // eslint-disable-next-line no-use-before-define
  next: Nullable<Node<T>> = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export default class Queue<T> {
  head: Nullable<Node<T>> = null;
  tail: Nullable<Node<T>> = null;
  size = 0;

  isEmpty() {
    return this.head === null;
  }

  /** `head.value` */
  peek() {
    return this.head?.value;
  }

  /** `head.value` */
  front() {
    return this.peek();
  }

  /** `tail.value` */
  back() {
    return this.tail?.value;
  }

  enqueue(value: T) {
    const newNode = new Node(value);

    this.size += 1;
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  dequeue() {
    if (!this.head) return undefined;

    const dequeueValue = this.head.value;

    this.head = this.head.next;
    this.size -= 1;

    return dequeueValue;
  }
}
