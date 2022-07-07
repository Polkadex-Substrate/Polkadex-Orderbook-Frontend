import { Client } from "rpc-websockets";

export async function getNonceForAccount(ws: Client, addr: string): Promise<number> {
  const nonce: number = (await ws.call("enclave_getNonce", [addr])) as number;
  return nonce + 1;
}
