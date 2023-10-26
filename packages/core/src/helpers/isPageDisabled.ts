export const isPageDisabled = (currentPage: string, disabledPages: string[]) =>
  !!disabledPages?.some((word) => currentPage.includes(word));
