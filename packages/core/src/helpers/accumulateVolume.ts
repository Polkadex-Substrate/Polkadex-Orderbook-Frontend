// accumulateVolume is a function that takes a 2D array e.g. [[a, b] ,[c, d], [e, f], .......]
// and returns a 1D array which looks like this [ab, ab + cd, ab + cd + ef, .........].
export const accumulateVolume = (array: string[][]) => {
  const total: number[] = [];
  array
    .map((item) => {
      return Number(item[0]) * Number(item[1]);
    })
    .reduce((accumulator, currentValue, currentIndex) => {
      total[currentIndex] = Number(accumulator) + Number(currentValue);

      return Number(accumulator) + Number(currentValue);
    }, 0);

  return total;
};
