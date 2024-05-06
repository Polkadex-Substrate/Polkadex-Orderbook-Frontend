export const isIdentical = <T>(
  data: T[],
  value: string,
  key: keyof T
): T | undefined =>
  data.find(
    (item) =>
      item[key as string].toString().toLowerCase() === value.toLowerCase()
  );
