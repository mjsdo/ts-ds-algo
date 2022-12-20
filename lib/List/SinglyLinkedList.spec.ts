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

  it('insert의 타겟 노드가 없다면 아무런 변화 없다.', () => {
    list.append(1).append(2);

    const node = list.find(3);

    list.insert(node, 100);

    expect(list.toString()).toBe(['[', 1, 2, ']'].join('\n'));
  });

  it('remove로 타겟 노드를 삭제할 수 있다.', () => {
    list.append(1).append(2);
    list.remove(2);
    expect(list.toString()).toBe(['[', 1, ']'].join('\n'));
  });

  it('remove로 삭제할 타겟이 없다면 아무런 변화 없다.', () => {
    list.append(1).append(2);
    list.remove(3);
    expect(list.toString()).toBe(['[', 1, 2, ']'].join('\n'));
  });

  it('remove로 지우려는 값이 두 개 이상 중복으로 존재한다면 앞에 위치한 값이 먼저 지워진다.', () => {
    list.append(1).append(2).append(1).append(2);

    list.remove(1);

    expect(list.head!.value).toBe(2);
    list.remove(2);
    expect(list.head!.value).toBe(1);
  });

  it('remove로 요소를 성공적으로 삭제한 경우 해당 요소를 반환한다.', () => {
    list.append(1).append(2).append(3);
    expect(list.remove(3)).toBe(3);
  });

  it('remove로 삭제하려는 요소가 없는 경우 undefined를 반환한다.', () => {
    list.append(1).append(2).append(3);
    expect(list.remove(4)).toBe(undefined);
  });

  it('toString으로 문자열 변환이 가능하며, 각 노드는 개행문자로 구분된다.', () => {
    expect(list.toString()).toBe(['[', ']'].join('\n'));
    expect(
      list
        .append(1)
        .append(2)
        .append(3)
        .append(4)
        .append(5)
        .append(6)
        .append(7)
        .toString(),
    ).toBe(['[', 1, 2, 3, 4, 5, 6, 7, ']'].join('\n'));
  });
});
