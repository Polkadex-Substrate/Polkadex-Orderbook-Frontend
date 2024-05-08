export const truncateString = (value: string, size = 8) => {
  const firstPart = value.slice(0, size);
  const lastPart = value.slice(value.length - size);

  return `${firstPart}...${lastPart}`;
};

export const truncateNames = (inputString: string, maxLength: number) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    const truncated = inputString.substring(0, maxLength);
    const lastNonAlphanumericIndex = truncated.search(/[^a-zA-Z0-9\s]$/);
    const truncateIndex =
      lastNonAlphanumericIndex !== -1 ? lastNonAlphanumericIndex : maxLength;
    return truncated.substring(0, truncateIndex) + "...";
  }
};
