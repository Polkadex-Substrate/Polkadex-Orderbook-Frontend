export const sliceString = (str: string, period: number): string => {
  return str ? (str.length > period ? `${str.slice(0, period)}...` : str) : str;
};
