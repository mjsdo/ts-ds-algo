/**
 * - -1: 왼쪽인자 우선
 * -  1: 오른쪽인자 우선
 * -  0: 동등
 */
export type CompareFn<T> = (a: T, b: T) => number;

export interface HeapInterface<T> {
  heap: [null, ...T[]];
  compareFn: (a: T | undefined, b: T | undefined) => ReturnType<CompareFn<T>>;
  push: (value: T) => this;
  peek: () => T | undefined;
  pop: () => T | undefined;
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
}

export const createHeap = <T>(compareFn: CompareFn<T>) =>
  class Heap implements HeapInterface<T> {
    heap: [null, ...T[]] = [null];

    compareFn(a: T | undefined, b: T | undefined) {
      if (a !== undefined && b !== undefined) return compareFn(a, b);
      if (a !== undefined && b === undefined) return -1;
      if (a === undefined && b !== undefined) return 1;
      return 0;
    }

    isEmpty() {
      return !this.size();
    }

    size() {
      return this.heap.length - 1;
    }

    push(value: T) {
      let targetIndex = this.size() + 1;
      this.heap[targetIndex] = value;
      this.siftUp(targetIndex);
      return this;
    }

    pop() {
      const size = this.size();
      if (size === 0) return;
      if (size === 1) return this.heap.pop() as T;

      const removedValue = this.heap[1];
      this.heap[1] = this.heap.pop() as T;
      this.siftDown(1);

      return removedValue;
    }

    peek() {
      return this.isEmpty() ? undefined : this.heap[1];
    }

    clear() {
      this.heap = [null];
    }

    private getParentIndex(childIndex: number) {
      return Math.floor(childIndex / 2);
    }

    private getLeftChildIndex(parentIndex: number) {
      return parentIndex * 2;
    }

    private getRightChildIndex(parentIndex: number) {
      return parentIndex * 2 + 1;
    }

    private getChildrenIndex(parentIndex: number) {
      if (parentIndex <= 0)
        throw new Error(
          'getChildrenIndex Error: parentIndex는 1 이상이어야 합니다.',
        );

      return [
        this.getLeftChildIndex(parentIndex),
        this.getRightChildIndex(parentIndex),
      ] as const;
    }

    private getChildren(parentIndex: number) {
      const [l, r] = this.getChildrenIndex(parentIndex);
      return [this.heap[l], this.heap[r]] as
        | [T, T]
        | [T, undefined]
        | [undefined, undefined];
    }

    private getChildrenIndexAndElement(parentIndex: number) {
      return [
        ...this.getChildrenIndex(parentIndex),
        ...this.getChildren(parentIndex),
      ] as const;
    }

    private swap(index1: number, index2: number) {
      const { heap } = this;
      [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
    }

    private siftUp(childIndex: number) {
      if (childIndex <= 0 || childIndex > this.size()) {
        throw new Error(
          `siftUp Error: index 범위 초과입니다.\n현재 heap 크기: ${this.size()}\n요청된 index: ${childIndex}`,
        );
      }

      const value = this.heap[childIndex] as T;
      let parentIndex = this.getParentIndex(childIndex);

      while (
        parentIndex > 0 &&
        this.compareFn(this.heap[parentIndex] as T, value) > 0
      ) {
        this.swap(parentIndex, childIndex);
        childIndex = parentIndex;
        parentIndex = this.getParentIndex(parentIndex);
      }
    }

    private siftDown(parentIndex: number = 1) {
      if (parentIndex <= 0 || parentIndex > this.size()) {
        throw new Error(
          `siftDown Error: index 범위 초과입니다.\n현재 heap 크기: ${this.size()}\n요청된 index: ${parentIndex}`,
        );
      }

      const value = this.heap[parentIndex] as T;

      let [leftChildIndex, rightChildIndex, leftChild, rightChild] =
        this.getChildrenIndexAndElement(parentIndex);
      let selectedIndex;

      while (
        (leftChild !== undefined && this.compareFn(value, leftChild) > 0) ||
        (rightChild !== undefined && this.compareFn(value, rightChild) > 0)
      ) {
        selectedIndex =
          this.compareFn(leftChild, rightChild) <= 0
            ? leftChildIndex
            : rightChildIndex;
        this.swap(parentIndex, selectedIndex);

        parentIndex = selectedIndex;
        [leftChildIndex, rightChildIndex, leftChild, rightChild] =
          this.getChildrenIndexAndElement(parentIndex);
      }
    }

    heapify() {}
  };

export const MaxHeap = createHeap<number>((a: number, b: number) => b - a);
export const MinHeap = createHeap<number>((a: number, b: number) => a - b);
