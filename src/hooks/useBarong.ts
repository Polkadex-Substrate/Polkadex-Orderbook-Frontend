import axios from "axios";
import { useState } from "react";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
// import WebSocket from "ws";
export function useBarong() {
  const [ping, setPing] = useState({
    data: null,
    isLoading: false,
  });

  const [session, setSession] = useState<any>({
    data: null,
    isLoading: false,
  });

  // const [wsConnection, setWsConnection] = useState({
  //   data: null,
  //   isLoading: false
  // })

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_URL,
  });

  const handleWsConnection = () => {
    // const wss = new WebSocket(process.env.NEXT_PUBLIC_PROXY_WS_URL, {
    //   headers: {
    //     Cookie: "123456",
    //     "User-Agent": "custom",
    //   },
    // });
    // try {
    //   wss.on("open", () => {
    //     console.log("Open...");
    //   });
    //   wss.on("message", (msg) => {
    //     console.log("Message:...", msg);
    //   });
    //   wss.on("error", (e) => {
    //     console.log("Error:...", e);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getExtensionAddress = () => {
    const keyring = new Keyring({ type: "ed25519", ss58Format: 2 });
    const mnemonic = mnemonicGenerate();
    const pair = keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
    return pair;
  };

  const getData = async () => {
    try {
      const data = getExtensionAddress();
      const { blake2AsHex } = await import("@polkadot/util-crypto");
      const { u8aToHex, stringToU8a } = await import("@polkadot/util");
      const nonce = Date.now().toString();
      const address = data.address;
      const message = "#" + address + "#" + nonce;
      const hash = blake2AsHex(message);
      const signature = data.sign(stringToU8a(hash));
      const payload = {
        nickname: address,
        algo: "ED25519", // NOTE: OPENWARE TEAM PLEASE NOTE THIS
        hash: "Blake2",
        nonce: nonce,
        signature: u8aToHex(signature),
      };
      return payload;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSession = async () => {
    const payload = await getData();
    try {
      // axiosInstance.defaults.withCredentials = true;
      return axiosInstance.post("/api/v2/barong/identity/sessions/signature", payload);
    } catch (error) {
      console.log(error.message);
    }
  };

  const runSessionExample = async () => {
    setSession({ ...session, isLoading: true });
    try {
      const response: any = await getSession();
      console.log(
        "Cookies response:",
        response?.headers["set-cookie"],
        "CSRFToken:",
        response?.data?.csrf_token
      );
      setSession({ ...session, data: response, isLoading: false });
    } catch (error) {
      console.log(error.message);
      setSession({ ...session, isLoading: false });
    }
  };

  const handlePing = async () => {
    setPing({ ...ping, isLoading: true });
    try {
      const { data } = await axiosInstance.get("/api/v2/barong/identity/ping");
      if (data) setPing({ ...ping, isLoading: false, data });
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    ping,
    handlePing,
    runSessionExample,
    session,
    handleWsConnection,
  };
}
