export const getFromStorage = (key: string): string => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};

export const setToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};
