import Stack from './Stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  it('초기화시 길이가 0이여야 한다.', () => {
    expect(stack.getLength()).toBe(0);
  });

  it('push로 요소를 뒤에 삽입할 수 있다.', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(2).push(3);
    expect(stack.peek()).toBe(3);
  });

  it('pop으로 뒤의 요소를 뺄 수 있고, 반환값은 뺀 요소이다.', () => {
    stack.push(1).push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it('pop 수행시 스택이 비어있다면 undefined를 반환한다.', () => {
    expect(stack.pop()).toBe(undefined);
  });

  it('clear를 사용하면 모든 요소가 지워진다.', () => {
    stack.push(1).push(2).push(3);
    stack.clear();
    expect(stack.getLength()).toBe(0);
  });
});
