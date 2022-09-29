export const isKeyPresentInObject = (object: any, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(object, key);
};
