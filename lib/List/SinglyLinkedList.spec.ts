import SinglyLinkedList from './SinglyLinkedList';

describe('SinglyLinkedList', () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  it('초기화시 head와 tail은 null이다.', () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('append하면 tail에 추가된다.', () => {
    list.append(0);

    expect(list.tail!.value).toBe(0);

    list.append(1).append(2);

    expect(list.tail!.value).toBe(2);
  });

  it('prepend하면 head에 추가된다.', () => {
    list.prepend(0);
    expect(list.head!.value).toBe(0);

    list.prepend(-1);
    expect(list.head!.value).toBe(-1);

    list.prepend(-2);
    expect(list.head!.value).toBe(-2);
  });

  it('find로 노드를 찾을 수 있고, 찾은 경우 노드를 반환한다.', () => {
    list.append(1).append(2);

    expect(list.find(2)!.value).toBe(2);
  });

  it('find로 요소를 찾지 못하면 null을 반환한다', () => {
    expect(list.find(3)).toBe(null);
  });

  it('insert로 타겟 노드의 다음에 요소를 삽입할 수 있다.', () => {
    list.append(1).append(2).append(3);

    const node = list.find(2);

    list.insert(node, 50);

    expect(list.toString()).toBe(['[', 1, 2, 50, 3, ']'].join('\n'));
  });

  it('remove로 삭제한 노드의 value가 반환된다.', () => {
    list.append(1).append(2);
    const value = list.remove((node) => node.value === 1);

    expect(value).toBe(1);
    expect(list.head!.value).toBe(2);
  });

  it('remove로 삭제할 노드가 없다면 undefined를 반환한다.', () => {
    list.append(1).append(2);
    const value = list.remove((node) => node.value === 3);
    expect(value).toBeUndefined();
  });

  it('remove에서 predicate을 만족하는 노드가 여러개라면 head에 가까운 순서대로 삭제된다.', () => {
    list.append(1).append(2).append(1).append(2);

    list.remove((node) => node.value === 1);
    expect(list.head!.value).toBe(2);

    list.remove((node) => node.value === 2);
    expect(list.head!.value).toBe(1);
    expect(list.tail!.value).toBe(2);
  });
});
