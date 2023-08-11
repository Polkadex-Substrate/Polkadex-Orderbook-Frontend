export const isKeyPresentInObject = (object: object, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(object, key);
};
