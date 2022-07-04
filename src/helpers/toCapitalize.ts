export const toCapitalize = (value: string): string =>
  value ? value[0].toUpperCase() + value.substring(1).toLowerCase() : "";
