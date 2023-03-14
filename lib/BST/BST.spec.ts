import BST from './BST';
import { shuffle } from '../utils/random';

describe('Binary Search Tree (default compareFn)', () => {
  let bst: BST<number>;

  beforeEach(() => {
    bst = new BST<number>();
  });

  it('초기화시 bst의 root는 null이다.', () => {
    const root = bst.root;
    expect(root).toBeNull();
  });

  it('bst에 처음 add하면 root에 추가된다.', () => {
    bst.add(1);
    const root = bst.root!;
    expect(root.value).toBe(1);
  });

  it('큰 값을 add하면 오른쪽 edge에 추가된다.', () => {
    bst.add(1).add(2);

    const rootRight = bst.root!.right;
    expect(rootRight?.value).toBe(2);

    bst.add(3);

    const rootRightRight = rootRight?.right;
    expect(rootRightRight?.value).toBe(3);
  });

  it('작은 값을 add하면 왼쪽 edge에 추가된다.', () => {
    bst.add(1).add(0);

    const rootLeft = bst.root!.left;
    expect(rootLeft?.value).toBe(0);

    bst.add(-1);

    const rootLeftLeft = rootLeft?.left;
    expect(rootLeftLeft?.value).toBe(-1);
  });

  it('동일한 값을 add하면 오른쪽 edge에 추가된다.', () => {
    bst.add(1).add(1);

    const rootRight = bst.root!.right;
    expect(rootRight?.value).toBe(1);

    bst.add(1);

    const rootRightRight = rootRight?.right;
    expect(rootRightRight?.value).toBe(1);
  });

  it('has는 값을 가지고 있는지 확인한다.', () => {
    bst.add(1);
    expect(bst.has(1)).toBe(true);
    expect(bst.has(0)).toBe(false);
  });

  it('delete는 갖고 있는 값을 삭제한다.', () => {
    bst.add(1);
    expect(bst.has(1)).toBe(true);

    bst.delete(1);
    expect(bst.has(1)).toBe(false);
  });

  it('toArray는 트리의 value를 오름차순 배열로 반환한다.', () => {
    const ascNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const nums = shuffle(ascNums);

    nums.forEach((num) => bst.add(num));

    expect(bst.toArray()).toEqual(ascNums);
  });
});

type Person = { name: string; age: number };
describe('Binary Search Tree (object value)', () => {
  let bst: BST<Person>;
  const compareFn = (a: Person, b: Person) => {
    if (a.name === b.name) {
      if (a.age === b.age) return BST.EQ;
      return a.age < b.age ? BST.LEFT_IS_GT : BST.RIGHT_IS_GT;
    }
    return a.name < b.name ? BST.LEFT_IS_GT : BST.RIGHT_IS_GT;
  };
  const sortFn = (a: Person, b: Person) => {
    const compareResult = compareFn(a, b);
    if (compareResult === BST.EQ) return 0;
    return compareResult === BST.RIGHT_IS_GT ? -1 : 1;
  };

  beforeEach(() => {
    bst = new BST<Person>(compareFn);
  });

  it('초기화시 bst의 root는 null이다.', () => {
    const root = bst.root;
    expect(root).toBeNull();
  });

  it('bst에 처음 add하면 root에 추가된다.', () => {
    const person = { name: 'a', age: 1 };
    bst.add(person);
    const root = bst.root!;
    expect(root.value).toBe(person);
  });

  it('큰 값을 add하면 오른쪽 edge에 추가된다.', () => {
    const person1 = { name: 'c', age: 20 };
    const person2 = { name: 'b', age: 19 };
    const person3 = { name: 'a', age: 18 };

    bst.add(person1).add(person2);
    expect(compareFn(person1, person2)).toBe(BST.RIGHT_IS_GT);

    const rootRight = bst.root!.right;
    expect(rootRight?.value).toEqual(person2);

    bst.add(person3);

    expect(compareFn(person2, person3)).toBe(BST.RIGHT_IS_GT);

    const rootRightRight = rootRight?.right;
    expect(rootRightRight?.value).toEqual(person3);
  });

  it('작은 값을 add하면 왼쪽 edge에 추가된다.', () => {
    const person1 = { name: 'a', age: 18 };
    const person2 = { name: 'b', age: 19 };
    const person3 = { name: 'c', age: 20 };

    bst.add(person1).add(person2);
    expect(compareFn(person1, person2)).toBe(BST.LEFT_IS_GT);

    const rootLeft = bst.root!.left;
    expect(rootLeft?.value).toEqual(person2);

    bst.add(person3);

    expect(compareFn(person2, person3)).toBe(BST.LEFT_IS_GT);

    const rootLeftLeft = rootLeft?.left;
    expect(rootLeftLeft?.value).toEqual(person3);
  });

  it('동일한 값을 add하면 오른쪽 edge에 추가된다.', () => {
    const person = { name: 'a', age: 18 };
    bst.add(person).add(person);

    expect(compareFn(person, person)).toBe(BST.EQ);
    const rootRight = bst.root!.right;
    expect(rootRight?.value).toBe(person);

    bst.add(person);

    const rootRightRight = rootRight?.right;
    expect(rootRightRight?.value).toEqual(person);
  });

  it('has는 값을 가지고 있는지 확인한다.', () => {
    const person = { name: 'a', age: 18 };
    bst.add(person);
    expect(bst.has({ name: 'a', age: 18 })).toBe(true);
    expect(bst.has({ name: 'a', age: 19 })).toBe(false);
  });

  it('delete는 갖고 있는 값을 삭제한다.', () => {
    const person = { name: 'a', age: 18 };
    bst.add(person);
    expect(bst.has({ name: 'a', age: 18 })).toBe(true);

    bst.delete({ name: 'a', age: 18 });
    expect(bst.has({ name: 'a', age: 18 })).toBe(false);
  });

  it('toArray는 트리의 value를 오름차순(compareFn 기준, 큰 값이 뒤로 가도록) 배열로 반환한다.', () => {
    const ascEntries = Array(10)
      .fill(undefined)
      .map((_, i) => ({
        name: String.fromCodePoint(i),
        age: i,
      }))
      .sort(sortFn);

    const entries = shuffle(ascEntries);

    entries.forEach((entry) => bst.add(entry));

    expect(bst.toArray()).toEqual(ascEntries);
  });
});
