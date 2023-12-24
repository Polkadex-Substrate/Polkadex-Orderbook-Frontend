import { useState } from "react";

import { Profile } from "./profile";

import { ConnectWalletInteraction } from "@/ui/templates/ConnectWalletInteraction";

const ConnectWallet = ({
  showFundingWallet = false,
}: {
  showFundingWallet?: boolean;
}) => {
  const [state, setState] = useState(false);

  return (
    <>
      <ConnectWalletInteraction open={state} onChange={setState} />
      <Profile
        onClick={() => setState(!state)}
        showFundingWallet={showFundingWallet}
      />
    </>
  );
};

export default ConnectWallet;
