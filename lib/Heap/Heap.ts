/**
 * - -1: 왼쪽인자 우선
 * -  1: 오른쪽인자 우선
 * -  0: 동등
 */
export type CompareFn<T> = (a: T, b: T) => number;

export interface HeapInterface<T> {
  compareFn: (a: T, b: T) => ReturnType<CompareFn<T>>;
  push: (...values: T[]) => this;
  peek: () => T | undefined;
  pop: () => T | undefined;
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  toArray: () => T[];
}
export default class Heap<T> implements HeapInterface<T> {
  private heap: [null, ...T[]] = [null];
  compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T>) {
    this.compareFn = compareFn;
  }

  isEmpty() {
    return !this.size();
  }

  size() {
    return this.heap.length - 1;
  }

  private pushOne(value: T) {
    this.heap.push(value);
    this.siftUp(this.size());
  }

  push(...values: T[]) {
    values.forEach((value) => this.pushOne(value));
    return this;
  }

  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) return this.heap.pop() as T;

    const removedValue = this.peek();
    this.heap[1] = this.heap.pop() as T;
    this.siftDown(1);

    return removedValue;
  }

  peek() {
    return this.heap[1];
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

  private swap(index1: number, index2: number) {
    const { heap } = this;
    [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
  }

  private siftUp(childIndex: number) {
    if (childIndex <= 1 || childIndex > this.size()) return;

    const parentIndex = this.getParentIndex(childIndex);
    const result = this.compareFn(
      this.heap[childIndex] as T,
      this.heap[parentIndex] as T,
    );

    result < 0 &&
      (this.swap(childIndex, parentIndex), this.siftUp(parentIndex));
  }

  private siftDown(parentIndex: number) {
    if (parentIndex < 1 || parentIndex > this.size() / 2) return;
    const { heap, compareFn } = this;

    const [leftIndex, rightIndex] = this.getChildrenIndex(parentIndex);

    let result;
    let selectedIndex;

    if (rightIndex > this.size()) {
      selectedIndex = leftIndex;
      result = compareFn(heap[parentIndex] as T, heap[leftIndex] as T);
    } else {
      result =
        compareFn(heap[leftIndex] as T, heap[rightIndex] as T) < 0
          ? ((selectedIndex = leftIndex),
            compareFn(heap[parentIndex] as T, heap[leftIndex] as T))
          : ((selectedIndex = rightIndex),
            compareFn(heap[parentIndex] as T, heap[rightIndex] as T));
    }

    result > 0 &&
      (this.swap(parentIndex, selectedIndex), this.siftDown(selectedIndex));
  }

  /**
   * @param arr heap구조로 변환할 배열
   * @param compareFn 비교 함수
   * @description Bottom-up heap construction
   */
  static heapify<V>(arr: V[], compareFn: CompareFn<V>) {
    const { length } = arr;
    const heap = new Heap<V>(compareFn);
    heap.heap = [null, ...arr];

    let index = Math.floor(length / 2);
    while (index > 0) heap.siftDown(index--);
    return heap;
  }

  toArray() {
    return this.heap.slice(1) as T[];
  }
}

export const maxHeap = new Heap<number>((a: number, b: number) => b - a);
export const minHeap = new Heap<number>((a: number, b: number) => a - b);
