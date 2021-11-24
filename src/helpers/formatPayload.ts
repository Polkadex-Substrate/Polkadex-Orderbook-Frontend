export interface RequestPayload {
  signature: {
    Sr25519: string;
  };
  payload: any;
}

export const formatPayload = (
  signature: string,
  payload: RequestPayload["payload"]
): RequestPayload => {
  return {
    signature: {
      Sr25519: signature.trim().slice(2),
    },
    payload,
  };
};
