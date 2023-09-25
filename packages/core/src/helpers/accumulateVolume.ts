// accumulateVolume is a function that takes a 2D array e.g. [[a, b] ,[c, d], [e, f], .......]
// and returns a 1D array which looks like this [ab, ab + cd, ab + cd + ef, .........].
export const accumulateVolume = (array) => {
  const total: number[] = [];
  array
    .map((item) => {
      return item[0] * item[1];
    })
    .reduce((accumulator, currentValue, currentIndex) => {
      total[currentIndex] = Number(accumulator) + Number(currentValue);

      return Number(accumulator) + Number(currentValue);
    }, 0);

  return total;
};
