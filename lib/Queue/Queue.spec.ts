import Queue from './Queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue();
  });

  it('초기화시 head와 tail은 null이다.', () => {
    expect(queue.head).toBeNull();
    expect(queue.tail).toBeNull();
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

  it('요소가 있을 때 dequeue하면 head.value가 반환된다.', () => {
    queue.enqueue(1).enqueue(2);

    let headValue = queue.front();
    let dequeueValue = queue.dequeue();

    expect(dequeueValue).toBe(headValue);

    headValue = queue.front();
    dequeueValue = queue.dequeue();

    expect(dequeueValue).toBe(headValue);
    expect(queue.isEmpty()).toBe(true);
  });

  it('peek하면 head.value가 반환된다.', () => {
    expect(queue.peek()).toBeUndefined();

    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
  });
});
