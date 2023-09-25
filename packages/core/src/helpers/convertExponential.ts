export const convertExponentialToString = (value: number) => {
  const stringValue = value.toString();
  // check if the number contains e
  const checker = stringValue.includes("e");
  if (checker) {
    const strArr = stringValue.split("");
    const exponentialValue = strArr[strArr.length - 1];
    return value.toFixed(+exponentialValue);
  }

  return `${value}`;
};
