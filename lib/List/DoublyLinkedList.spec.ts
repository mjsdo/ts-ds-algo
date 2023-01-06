import DoublyLinkedList from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList();
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

  it('append하면 노드가 양방향으로 연결된다.', () => {
    list.append(0).append(1).append(2).append(3);

    let prevNode = list.head;
    let curNode = list.head?.next;
    while (prevNode && curNode) {
      expect(prevNode.next).toBe(curNode);
      expect(curNode.prev).toBe(prevNode);

      prevNode = curNode;
      curNode = curNode.next;
    }

    expect(curNode).toBeNull();
    expect(prevNode?.next).toBe(curNode);
  });

  it('prepend하면 head에 노드가 추가된다.', () => {
    list.prepend(0);
    expect(list.head!.value).toBe(0);

    list.prepend(-1);
    expect(list.head!.value).toBe(-1);

    list.prepend(-2);
    expect(list.head!.value).toBe(-2);
  });

  it('prepend하면 노드가 양방향으로 연결된다.', () => {
    list.prepend(0).prepend(1).prepend(2).prepend(3);

    let prevNode = list.head;
    let curNode = list.head?.next;
    while (prevNode && curNode) {
      expect(prevNode.next).toBe(curNode);
      expect(curNode.prev).toBe(prevNode);

      prevNode = curNode;
      curNode = curNode.next;
    }

    expect(curNode).toBeNull();
    expect(prevNode?.next).toBe(curNode);
  });

  it('find로 노드를 찾을 수 있고, 찾은 경우 value를 반환한다.', () => {
    list.append(1).append(2);

    const node = list.find((node) => node.value === 2);
    expect(node!.value).toBe(2);
  });

  it('find로 노드를 찾지 못하면 null을 반환한다', () => {
    const node = list.find((node) => node.value === 3);
    expect(node).toBeNull();
  });

  it('insertAfter의 기준 노드가 null이라면 아무 일도 일어나지 않는다.', () => {
    list.insertAfter(null, 100);
    expect(list.head).toBeNull();
  });

  it('insertAfter로 기준 노드의 next에 노드를 삽입할 수 있고, 양방향으로 연결된다.', () => {
    // [1 <-> 2 <-> 50 <-> 3]
    list.append(1).append(2).append(3);
    const node = list.find((node) => node.value === 2);
    list.insertAfter(node, 50);

    const insertedNode = node!.next!;

    expect(insertedNode.value).toBe(50);
    expect(insertedNode.prev).toBe(node);
    expect(insertedNode.next!.value).toBe(3);
    expect(insertedNode.next!.prev).toBe(insertedNode);
  });

  it('insertBefore의 기준 노드가 null이라면 아무 일도 일어나지 않는다.', () => {
    list.insertAfter(null, 100);
    expect(list.head).toBeNull();
  });

  it('insertBefore의 기준 노드가 prev에 노드를 삽입할 수 있고, 양방향으로 연결된다.', () => {
    // [1 <-> 50 <-> 2 <-> 3]
    list.append(1).append(2).append(3);
    const node = list.find((node) => node.value === 2);
    list.insertBefore(node, 50);

    const insertedNode = node!.prev!;

    expect(insertedNode.value).toBe(50);
    expect(insertedNode.next).toBe(node);
    expect(insertedNode.prev!.value).toBe(1);
    expect(insertedNode.prev!.next).toBe(insertedNode);
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

    it('remove로 삭제한 노드의 prev노드와 next노드가 양방향으로 연결되고, 삭제된 노드의 value를 반환한다.', () => {
      list.append(1).append(2).append(3);

      const removedNode = list.find((node) => node.value === 2)!;
      const prevRemovedNode = removedNode.prev!;
      const nextRemovedNode = removedNode.next!;

      const value = list.remove((node) => node === removedNode);

      expect(value).toBe(2);
      expect(prevRemovedNode.next).toBe(nextRemovedNode);
      expect(nextRemovedNode.prev).toBe(prevRemovedNode);
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
      // [ 1 <-> 2 <-> 3 <-> 1 ]
      list.remove((node) => node.value === 1);

      // [ 2 <-> 3 <-> 1 ]
      expect(list.head!.value).toBe(2);
      expect(list.tail!.value).toBe(1);
    });

    it('start를 지정해서 탐색 시작 위치를 정할 수 있다.', () => {
      // [ 1 <-> 2 <-> 3 <-> 1]
      const secondNode = list.find((node) => node.value === 2);
      list.remove((node) => node.value === 1, secondNode);

      // [ 1 <-> 2 <-> 3 ]
      expect(list.head!.value).toBe(1);
      expect(list.tail!.value).toBe(3);
    });

    it('reverseDirection을 true로 지정해서 탐색 방향을 역방향으로 설정할 수 있다.', () => {
      // [ 1 <-> 2 <-> 3 <-> 1]
      const secondNode = list.find((node) => node.value === 2);
      list.remove((node) => node.value === 1, secondNode, true);

      // [ 2 <-> 3 <-> 1 ]
      expect(list.head!.value).toBe(2);
      expect(list.tail!.value).toBe(1);
    });
  });
});
