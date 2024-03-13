export const searchInArray = (findItem: string, items: string[]) =>
  !!items.some((word) => findItem.includes(word));
