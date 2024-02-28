export const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const clientOrderId = new Uint8Array(32);
  clientOrderId.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    clientOrderId[i] = Math.floor(Math.random() * 256);
  }
  return clientOrderId;
};
