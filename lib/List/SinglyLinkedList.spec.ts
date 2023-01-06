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

  it('append하면 tail에 노드가 추가된다.', () => {
    list.append(0);
    expect(list.tail!.value).toBe(0);

    list.append(1).append(2);
    expect(list.tail!.value).toBe(2);
  });

  it('prepend하면 head에 노드가 추가된다.', () => {
    list.prepend(0);
    expect(list.head!.value).toBe(0);

    list.prepend(-1);
    expect(list.head!.value).toBe(-1);

    list.prepend(-2);
    expect(list.head!.value).toBe(-2);
  });

  it('find로 노드를 찾을 수 있고, 찾은 경우 value를 반환한다.', () => {
    list.append(1).append(2);

    const node = list.find((node) => node.value === 2);
    expect(node!.value).toBe(2);
  });

  it('find로 요소를 찾지 못하면 null을 반환한다', () => {
    const node = list.find((node) => node.value === 3);
    expect(node).toBeNull();
  });

  it('insertAfter의 기준 노드가 null이라면 아무 일도 일어나지 않는다.', () => {
    list.insertAfter(null, 100);
    expect(list.head).toBeNull();
  });

  it('insertAfter로 기준 노드의 next에 노드를 삽입할 수 있고, 단방향으로 연결된다.', () => {
    // [ 1 -> 2 -> 50 -> 3 ]
    list.append(1).append(2).append(3);

    const node = list.find((node) => node.value === 2);
    list.insertAfter(node, 50);

    const insertedNode = node!.next!;

    expect(insertedNode.value).toBe(50);
    expect(insertedNode.next).toBe(list.tail);
  });

  describe('removeHeadNode와 removeTailNode', () => {
    beforeEach(() => {
      list.append(1).append(2).append(3);
    });

    it('removeHeadNode로 head를 삭제할 수 있다.', () => {
      list.removeHeadNode();
      expect(list.head!.value).toBe(2);
    });

    it('removeTailNode로 tail을 삭제할 수 있다.', () => {
      list.removeTailNode();
      expect(list.tail!.value).toBe(2);
    });
  });

  describe('remove에서 predicate을 만족하는 노드가 한개인 경우', () => {
    it('마지막 남은 노드를 삭제하면, head와 tail은 초기 상태인 null이 된다.', () => {
      list.append(1);
      expect(list.head!.value).toBe(1);
      expect(list.tail!.value).toBe(1);
      expect(list.tail).toBe(list.head);

      list.remove((node) => node.value === 1);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it('remove로 삭제한 노드의 prev노드와 next노드가 단뱡향으로 연결되고, 삭제된 노드의 value를 반환한다.', () => {
      list.append(1).append(2).append(3);

      const removedNode = list.find((node) => node.value === 2)!;
      const prevRemovedNode = list.head!;
      const nextRemovedNode = list.tail!;

      const value = list.remove((node) => node === removedNode);

      expect(value).toBe(2);
      expect(prevRemovedNode.next).toBe(nextRemovedNode);
    });

    it('remove로 삭제할 노드가 없다면 undefined를 반환한다.', () => {
      list.append(1).append(2);
      const value = list.remove((node) => node.value === 3);
      expect(value).toBeUndefined();
    });
  });

  describe('remove에서 predicate을 만족하는 노드가 여러개인 경우', () => {
    beforeEach(() => {
      list.append(1).append(2).append(3).append(1);
    });

    it('먼저 탐색된 노드를 지운다', () => {
      // [ 1 -> 2 -> 3 -> 1 ]
      list.remove((node) => node.value === 1);

      // [ 2 <-> 3 <-> 1 ]
      expect(list.head!.value).toBe(2);
      expect(list.tail!.value).toBe(1);
    });

    it('start를 지정해서 탐색 시작 위치를 정할 수 있다.', () => {
      // [ 1 -> 2 -> 3 -> 1]
      const secondNode = list.find((node) => node.value === 2);
      list.remove((node) => node.value === 1, secondNode);

      // [ 1 -> 2 -> 3 ]
      expect(list.head!.value).toBe(1);
      expect(list.tail!.value).toBe(3);
    });
  });
});
