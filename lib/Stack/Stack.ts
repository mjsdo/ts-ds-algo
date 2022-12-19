export default class Stack<T> {
  public array: Array<T> = [];

  push(value: T) {
    this.array.push(value);
    return this;
  }

  pop() {
    return this.array.pop();
  }

  peek() {
    return this.array.at(-1);
  }

  clear() {
    this.array.length = 0;
    return this;
  }

  getLength() {
    return this.array.length;
  }
}
