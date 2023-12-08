export const isValidJson = (e: string) => {
  try {
    JSON.parse(e);
    return true;
  } catch (error) {
    return false;
  }
};
