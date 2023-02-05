import { HeapInterface, default as Heap } from './Heap';
interface Variant {
  v1: number;
  v2: number;
}

describe('Heap', () => {
  let heap: HeapInterface<number>;
  beforeEach(() => {
    heap = new Heap((a, b) => a - b);
  });

  it('초기화하면 size가 0이다.', () => {
    expect(heap.size()).toBe(0);
  });

  it('push로 배열이 아닌 값을 전달하면 size가 1 늘어난다.', () => {
    heap.push(1);
    expect(heap.size()).toBe(1);
    heap.push(1);
    expect(heap.size()).toBe(2);
    heap.push(1);
    expect(heap.size()).toBe(3);
    heap.push(1);
    expect(heap.size()).toBe(4);
  });

  it('push로 배열을 전달하면 전달한 배열의 길이만큼 size가 늘어난다', () => {
    const arr = [1, 2, 3, 4];
    heap.push(arr);
    expect(heap.size()).toBe(arr.length);
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

  it('toArray하면 null값이 없는 배열로 변환후 반환한다.', () => {
    const nums = [1, 2, 3, 4];
    const isNull = (v: any) => v === null;

    heap.push(nums);
    const arr = heap.toArray();
    expect(arr.some(isNull)).toBeFalsy();
  });

  it('toArray해서 반환받은 배열에는 heap이 가지고 있던 모든 요소가 있다.', () => {
    const nums = [4, 3, 2, 1, 0, 1, 2, 3, 4];
    heap.push(nums);
    const arr = heap.toArray();
    while (nums.length) {
      const pop = nums.pop() as number;
      expect(arr.includes(pop)).toBeTruthy();
    }
  });
});

describe('MaxHeap', () => {
  let maxHeap: HeapInterface<number>;
  const maxHeapCompareFn = (a: number, b: number) => b - a;
  const nums = [23, 9, 8, 100, -100, 34, 51, -50, -64];
  const numsSortedByMaxHeapCompareFn = [...nums].sort(maxHeapCompareFn);

  beforeEach(() => {
    maxHeap = new Heap(maxHeapCompareFn);
    maxHeap.push(nums);
  });

  it('pop하면 크기가 가장 큰 숫자가 제거된다.', () => {
    const pops = [];
    while (maxHeap.size()) pops.push(maxHeap.pop());
    expect(pops).toEqual(numsSortedByMaxHeapCompareFn);
  });

  it('peek하면 크기가 가장 큰 숫자가 반환된다.', () => {
    while (maxHeap.size()) expect(maxHeap.peek()).toBe(maxHeap.pop());
  });
});

describe('MinHeap', () => {
  let minHeap: HeapInterface<number>;
  const minHeapCompareFn = (a: number, b: number) => a - b;
  const nums = [23, 9, 8, 100, -100, 34, 51, -50, -64];
  const numsSortedByMinHeapCompareFn = [...nums].sort(minHeapCompareFn);

  beforeEach(() => {
    minHeap = new Heap(minHeapCompareFn);
    minHeap.push(nums);
  });

  it('pop하면 크기가 가장 작은 숫자가 제거된다.', () => {
    const pops = [];
    while (minHeap.size()) pops.push(minHeap.pop());
    expect(pops).toEqual(numsSortedByMinHeapCompareFn);
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

  const vals = [
    { v1: 10, v2: 0 },
    { v1: -30, v2: 10 },
    { v1: -40, v2: -40 },
    { v1: 3, v2: 9 },
    { v1: 7, v2: 4 },
    { v1: 3, v2: 11 },
    { v1: 1, v2: -30 },
    { v1: 0, v2: 21 },
    { v1: -40, v2: -40 },
  ];

  const valsSortedBySortFn = [...vals].sort(sortFn);

  beforeEach(() => {
    heap = new Heap(sortFn);
    heap.push(vals);
  });

  it('pop순서는 정렬 함수로 heap배열을 정렬한 순서와 일치한다.', () => {
    const pops = [];
    while (heap.size()) pops.push(heap.pop());
    expect(pops).toEqual(valsSortedBySortFn);
  });
});

describe('Heapify', () => {
  const arr = [1, 2, 3, 4, 4, 4, 5, 6, 6, 7, 8, 9];
  const compareFn = (a: number, b: number) => b - a;
  const sorted = [...arr].sort(compareFn);
  let maxHeap: HeapInterface<number>;

  beforeEach(() => {
    maxHeap = Heap.heapify(arr, compareFn);
  });

  it('Heapify로 생성한 heap의 pop 순서는 정렬 함수로 heap배열을 정렬한 순서와 일치한다.', () => {
    const pops = [];
    while (maxHeap.size()) pops.push(maxHeap.pop());
    expect(sorted).toEqual(pops);
  });
});
