export const truncateString = (value: string, size = 8) => {
  const firstPart = value.slice(0, size);
  const lastPart = value.slice(value.length - size);

  return `${firstPart}...${lastPart}`;
};
