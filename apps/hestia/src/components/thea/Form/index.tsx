import { Button, Input, Token, Typography } from "@polkadex/ux";
import { RiArrowDownSLine } from "@remixicon/react";
import { Fragment, useState } from "react";

import { SelectAsset } from "../selectAsset";
import { ConnectAccount } from "../connectAccount";

import { WalletCard } from "./wallet";

export const Form = () => {
  const [openAsset, setOpenAsset] = useState(false);
  const [openFromAccount, setOpenFromAccount] = useState(false);

  return (
    <Fragment>
      <SelectAsset open={openAsset} onOpenChange={setOpenAsset} loading />
      <ConnectAccount
        open={openFromAccount}
        onOpenChange={setOpenFromAccount}
      />
      <div className="flex flex-col gap-4 flex-1 max-w-[800px] mx-auto py-10 w-full px-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography.Heading>Networks</Typography.Heading>
            <div className="flex max-lg:flex-col  gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">From</Typography.Text>
                  <Button.Outline
                    appearance="secondary"
                    className="gap-1 px-2 py-7 justify-between"
                    onClick={() => setOpenFromAccount(true)}
                  >
                    <div className="flex items-center gap-2">
                      <Token name="DOT" size="md" />
                      <Typography.Text size="lg" bold>
                        Ethereum
                      </Typography.Text>
                    </div>
                    <RiArrowDownSLine className="w-4 h-4" />
                  </Button.Outline>
                </div>
                <WalletCard>0xCCfa92aD6...59444be6</WalletCard>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">To</Typography.Text>
                  <Button.Outline
                    appearance="secondary"
                    className="gap-1 px-2 py-7 justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Token name="PDEX" size="md" />
                      <Typography.Text size="lg" bold>
                        Polkadex
                      </Typography.Text>
                    </div>
                    <RiArrowDownSLine className="w-4 h-4" />
                  </Button.Outline>
                </div>
                <WalletCard>0xCCfa92aD6...59444be6</WalletCard>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography.Heading>Asset</Typography.Heading>
            <div className="flex item-center border border-primary rounded-sm">
              <Input.Vertical className="w-full pl-4 py-4" placeholder="0.00" />
              <Button.Outline
                appearance="secondary"
                className="gap-1 px-2 py-7 justify-between"
                onClick={() => setOpenAsset(true)}
              >
                <div className="flex items-center gap-2">
                  <Token name="DOT" size="md" />
                  <Typography.Text size="md">Select token</Typography.Text>
                </div>
                <RiArrowDownSLine className="w-4 h-4" />
              </Button.Outline>
            </div>
          </div>
        </div>
        <Button.Solid disabled>Bridge</Button.Solid>
      </div>
    </Fragment>
  );
};
