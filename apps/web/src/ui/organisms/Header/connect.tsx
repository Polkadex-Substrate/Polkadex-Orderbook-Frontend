import { useState } from "react";

import { Profile } from "./profile";

import { ConnectWalletInteraction } from "@/ui/templates/ConnectWalletInteraction";

const ConnectWallet = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <ConnectWalletInteraction open={state} onChange={setState} />
      <Profile onClick={() => setState(!state)} />
    </>
  );
};

export default ConnectWallet;
