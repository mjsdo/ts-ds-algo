import { MaxHeap, MinHeap, HeapInterface, createHeap } from './Heap';
interface Variant {
  v1: number;
  v2: number;
}

describe('Heap', () => {
  let heap: HeapInterface<number>;
  beforeEach(() => {
    heap = new MaxHeap();
  });

  it('초기화하면 size가 0이다.', () => {
    expect(heap.size()).toBe(0);
  });

  it('push하면 size가 1 늘어난다.', () => {
    heap.push(1);
    expect(heap.size()).toBe(1);
    heap.push(1);
    expect(heap.size()).toBe(2);
    heap.push(1);
    expect(heap.size()).toBe(3);
    heap.push(1);
    expect(heap.size()).toBe(4);
  });

  it('pop하면 size가 1 줄어든다.', () => {
    heap.push(1).push(1).push(1).push(1);
    heap.pop();
    expect(heap.size()).toBe(3);
    heap.pop();
    expect(heap.size()).toBe(2);
    heap.pop();
    expect(heap.size()).toBe(1);
    heap.pop();
    expect(heap.size()).toBe(0);
  });

  it('clear하면 heap이 초기화되어 size가 0이 된다.', () => {
    heap.push(1).push(1).push(1).push(1);
    heap.clear();
    expect(heap.size()).toBe(0);
  });

  describe('MaxHeap', () => {
    let maxHeap: HeapInterface<number>;
    beforeEach(() => {
      maxHeap = new MaxHeap();
      maxHeap
        .push(23)
        .push(9)
        .push(8)
        .push(100)
        .push(-100)
        .push(34)
        .push(51)
        .push(-50)
        .push(-64);
    });

    it('pop하면 크기가 가장 큰 숫자가 제거된다.', () => {
      const arr = [];
      while (maxHeap.size()) arr.push(maxHeap.pop());
      const dup = ([...arr] as number[]).sort((a, b) => b - a);

      expect(arr).toEqual(dup);
    });

    it('peek하면 크기가 가장 큰 숫자가 반환된다.', () => {
      while (maxHeap.size()) expect(maxHeap.peek()).toBe(maxHeap.pop());
    });
  });

  describe('MinHeap', () => {
    let minHeap: HeapInterface<number>;
    beforeEach(() => {
      minHeap = new MinHeap();
      minHeap
        .push(23)
        .push(9)
        .push(8)
        .push(100)
        .push(-100)
        .push(34)
        .push(51)
        .push(-50)
        .push(-64);
    });

    it('pop하면 크기가 가장 작은 숫자가 제거된다.', () => {
      const arr = [];
      while (minHeap.size()) arr.push(minHeap.pop());
      const dup = ([...arr] as number[]).sort((a, b) => a - b);

      expect(arr).toEqual(dup);
    });

    it('peek하면 크기가 가장 작은 숫자가 반환된다.', () => {
      while (minHeap.size()) expect(minHeap.peek()).toBe(minHeap.pop());
    });
  });

  describe('Variant', () => {
    let heap: HeapInterface<Variant>;
    // v1 오름차순, v1이 같다면 v2 내림차순
    const sortFn = (a: Variant, b: Variant) => {
      if (a.v1 === b.v1) {
        return b.v2 - a.v2;
      }
      return a.v1 - b.v1;
    };

    beforeEach(() => {
      const Heap = createHeap<Variant>(sortFn);
      heap = new Heap();
      heap
        .push({ v1: 10, v2: 0 })
        .push({ v1: -30, v2: 10 })
        .push({ v1: -40, v2: -40 })
        .push({ v1: 3, v2: 9 })
        .push({ v1: 7, v2: 4 })
        .push({ v1: 3, v2: 11 })
        .push({ v1: 1, v2: -30 })
        .push({ v1: 0, v2: 21 })
        .push({ v1: -40, v2: -40 });
    });

    it('pop순서는 정렬 함수의 순서와 일치한다.', () => {
      const arr = [];
      while (heap.size()) arr.push(heap.pop());
      const dup = ([...arr] as Variant[]).sort(sortFn);
      expect(arr).toEqual(dup);
    });
  });
});
