export function areArraysEqual<T>(arr1: T[], arr2: T[], compareFn?: (a: T, b: T) => number): boolean {
  const sortedArr1 = arr1.toSorted(compareFn);
  const sortedArr2 = arr2.toSorted(compareFn);
  console.log(sortedArr1);
  console.log(sortedArr2);
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}
