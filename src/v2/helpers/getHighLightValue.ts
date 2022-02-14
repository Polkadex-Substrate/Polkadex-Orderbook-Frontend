export const getHighLightValue = (prevValue: string, curValue: string): string => {
  let highlighted = "";
  let val = curValue;
  let prev = prevValue;

  while (val !== prev && val.length > 0) {
    highlighted = val[val.length - 1] + highlighted;
    val = val.slice(0, -1);
    prev = prev.slice(0, -1);
  }

  return `${val}${highlighted}`;
};
