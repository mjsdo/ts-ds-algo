import ArrayQueue from './ArrayQueue';

describe('Queue', () => {
  let queue: ArrayQueue<number>;

  beforeEach(() => {
    queue = new ArrayQueue();
  });

  it('초기화시 head는 0, tail은 -1이다.', () => {
    expect(queue.head).toBe(0);
    expect(queue.tail).toBe(-1);
  });

  it('초기화시 isEmpty()가 true이다.', () => {
    expect(queue.isEmpty()).toBe(true);
  });

  it('enqueue하면 tail에 추가된다.', () => {
    queue.enqueue(1);
    expect(queue.back()).toBe(1);

    queue.enqueue(2).enqueue(3);
    expect(queue.back()).toBe(3);

    expect(queue.isEmpty()).toBe(false);
  });

  it('아무것도 없을 때 dequeue하면 undefined가 반환된다.', () => {
    expect(queue.dequeue()).toBeUndefined();
  });

  it('요소가 있을 때 dequeue하면 인덱스가 head인 요소가 반환된다.', () => {
    queue.enqueue(1).enqueue(2);

    let headValue = queue.front();
    let dequeueValue = queue.dequeue();

    expect(dequeueValue).toBe(headValue);

    headValue = queue.front();
    dequeueValue = queue.dequeue();

    expect(dequeueValue).toBe(headValue);
    expect(queue.isEmpty()).toBe(true);
  });

  it('peek하면 인덱스가 head인 요소가 반환된다.', () => {
    expect(queue.peek()).toBeUndefined();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
  });

  it('size하면 큐의 길이가 반환된다.', () => {
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(1);
    expect(queue.size()).toBe(2);

    queue.dequeue();
    expect(queue.size()).toBe(1);
    queue.dequeue();
    expect(queue.size()).toBe(0);
    queue.dequeue();
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
  });
});
