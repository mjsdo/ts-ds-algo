const createBinarySearch = <T>(arr: T[], compareFn: (a: T, b: T) => number) => {
  return (target: T) => {
    const search = (l: number, r: number): number => {
      if (l > r) return -1;

      const m = Math.floor((l + r) / 2);
      const mValue = arr[m];
      const compareResult = compareFn(target, mValue);

      // target < mValue
      if (compareResult < 0) return search(l, m - 1);

      // target > mValue
      if (compareResult > 0) return search(m + 1, r);

      return m;
    };

    return search(0, arr.length - 1);
  };
};

export default createBinarySearch;
