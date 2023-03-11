class Heap {
  heap = [null];
  compareFn;

  constructor(c) {
    if (!c) throw new Error('비교함수 필요');
    this.compareFn = c;
  }

  size() {
    return this.heap.length - 1;
  }

  #pushOne(value) {
    this.heap.push(value);
    this.siftUp(this.size());
  }

  push(...values) {
    // 이부분 고쳐야함
    values.forEach((value) => this.#pushOne(value));
    return this;
  }

  pop() {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heap.pop();

    const removedValue = this.peek();
    this.heap[1] = this.heap.pop();
    this.siftDown(1);

    return removedValue;
  }

  swap(index1, index2) {
    const { heap: _ } = this;
    [_[index1], _[index2]] = [_[index2], _[index1]];
  }

  peek() {
    return this.heap[1];
  }

  siftUp(childIndex) {
    if (childIndex <= 1) return;

    const parentIndex = this.getParentIndex(childIndex);

    const result = this.compareFn(
      this.heap[childIndex],
      this.heap[parentIndex],
    );
    result < 0 &&
      (this.swap(childIndex, parentIndex), this.siftUp(parentIndex));
  }

  siftDown(parentIndex) {
    if (parentIndex > this.size() / 2) return;
    const { heap } = this;

    const [leftIndex, rightIndex] = this.getChildrenIndex(parentIndex);
    let result;
    let selectedIndex;

    if (rightIndex > this.size()) {
      selectedIndex = leftIndex;
      result = this.compareFn(heap[parentIndex], heap[leftIndex]);
    } else {
      result =
        this.compareFn(heap[leftIndex], heap[rightIndex]) < 0
          ? ((selectedIndex = leftIndex),
            this.compareFn(heap[parentIndex], heap[leftIndex]))
          : ((selectedIndex = rightIndex),
            this.compareFn(heap[parentIndex], heap[rightIndex]));
    }

    result > 0 &&
      (this.swap(parentIndex, selectedIndex), this.siftDown(selectedIndex));
  }

  getParentIndex(index) {
    return Math.floor(index / 2);
  }

  getChildrenIndex(index) {
    return [index * 2, index * 2 + 1];
  }

  toArray() {
    return this.heap.slice(1);
  }
}
