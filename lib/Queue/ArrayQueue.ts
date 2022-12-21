export default class ArrayQueue<T> {
  head = 0;
  tail = -1;
  queue: T[] = [];

  isEmpty() {
    return !this.size();
  }

  peek() {
    return this.queue[this.head];
  }

  front() {
    return this.peek();
  }

  back() {
    return this.queue[this.tail];
  }

  enqueue(value: T) {
    this.tail += 1;
    this.queue[this.tail] = value;
    return this;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const dequeueValue = this.peek();

    delete this.queue[this.head];
    this.head += 1;

    return dequeueValue;
  }

  size() {
    return this.tail - this.head + 1;
  }
}
