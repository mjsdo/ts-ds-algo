const getMemoryUsage = () => {
  return process.memoryUsage();
};

const calculateDifferneceInMb = (a: number, b: number) => {
  const divisor = 1024 * 1024;
  return Math.trunc(Math.abs(a - b) / divisor);
};

const main = () => {
  const arr = [];

  const start = getMemoryUsage();

  for (let i = 0; i < 10_000_000; i++) {
    arr.push(i);
    delete arr[i];
  }

  const end = getMemoryUsage();

  console.log(
    `heapTotal 차이: ${calculateDifferneceInMb(
      start.heapTotal,
      end.heapTotal,
    )}MB`,
  );
  console.log(
    `heapUsed 차이: ${calculateDifferneceInMb(start.heapUsed, end.heapUsed)}MB`,
  );
};

main();
