import {
  Button,
  Input,
  Token,
  TokenAppearance,
  Typography,
} from "@polkadex/ux";
import { RiArrowDownSLine, RiArrowLeftRightLine } from "@remixicon/react";
import { Fragment, useMemo, useState } from "react";
import { useTheaProvider } from "@orderbook/core/providers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { SelectAsset } from "../selectAsset";
import { ConnectAccount } from "../connectAccount";

import { WalletCard } from "./wallet";
import { NetworkCard } from "./networkCard";

import { createQueryString } from "@/helpers";
import { useBridge } from "@/hooks";

export const Form = () => {
  const [openAsset, setOpenAsset] = useState(false);
  const [openSourceModal, setOpenSourceModal] = useState(false);
  const [openDestinationModal, setOpenDestinationModal] = useState(false);

  const {
    sourceChain,
    setSourceChain,
    destinationChain,
    setDestinationChain,
    sourceAccount,
    setSourceAccount,
    destinationAccount,
    setDestinationAccount,
    selectedAsset,
    sourceBalances,
  } = useTheaProvider();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const balance = useMemo(
    () =>
      sourceBalances?.find((x) =>
        x.ticker.includes(selectedAsset?.ticker ?? "")
      ),
    [sourceBalances, selectedAsset?.ticker]
  );

  const onSwitchChain = () => {
    setSourceChain(destinationChain);
    setDestinationChain(sourceChain);
    const data = [
      { name: "from", value: destinationChain?.name },
      { name: "to", value: sourceChain?.name },
    ];
    createQueryString({
      data,
      pathname,
      searchParams,
      push,
    });
  };

  const { setAmount, amount, onBridge } = useBridge();

  return (
    <Fragment>
      <SelectAsset open={openAsset} onOpenChange={setOpenAsset} />
      <ConnectAccount
        open={openSourceModal}
        onOpenChange={setOpenSourceModal}
        selectedChain={sourceChain}
        secondaryChain={destinationChain?.genesis}
        setChain={setSourceChain}
        selectedAccount={sourceAccount}
        setAccount={setSourceAccount}
        from
      />
      <ConnectAccount
        open={openDestinationModal}
        onOpenChange={setOpenDestinationModal}
        selectedChain={destinationChain}
        secondaryChain={sourceChain?.genesis}
        setChain={setDestinationChain}
        selectedAccount={destinationAccount}
        setAccount={setDestinationAccount}
      />
      <div className="flex flex-col gap-4 flex-1 max-w-[800px] mx-auto py-10 w-full px-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography.Heading>Networks</Typography.Heading>
            <div className="flex max-lg:flex-col gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">From</Typography.Text>
                  <NetworkCard
                    name={sourceChain?.name ?? ""}
                    icon={sourceChain?.logo ?? ""}
                    onOpenModal={() => setOpenSourceModal(true)}
                  />
                </div>
                {sourceAccount && (
                  <WalletCard
                    name={sourceAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenSourceModal(true);
                    }}
                  >
                    {sourceAccount.address}
                  </WalletCard>
                )}
              </div>
              <Button.Icon
                variant="outline"
                className="lg:mt-9 h-10 w-10 p-3 max-lg:self-center"
                onClick={onSwitchChain}
              >
                <RiArrowLeftRightLine className="w-full h-full" />
              </Button.Icon>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">To</Typography.Text>
                  <NetworkCard
                    name={destinationChain?.name ?? ""}
                    icon={destinationChain?.logo ?? ""}
                    onOpenModal={() => setOpenDestinationModal(true)}
                  />
                </div>
                {destinationAccount && (
                  <WalletCard
                    name={destinationAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenDestinationModal(true);
                    }}
                  >
                    {destinationAccount.address}
                  </WalletCard>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography.Heading>Asset</Typography.Heading>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Typography.Text appearance="primary">Amount</Typography.Text>
                {selectedAsset && (
                  <Typography.Text appearance="primary">
                    Available: {balance?.amount ?? 0} {selectedAsset?.ticker}
                  </Typography.Text>
                )}
              </div>
              <div className="flex item-center border border-primary rounded-sm">
                <Input.Vertical
                  value={amount}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  className="w-full pl-4 py-4"
                  placeholder="0.00"
                >
                  {sourceAccount && (
                    <Input.Action
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      MAX
                    </Input.Action>
                  )}
                </Input.Vertical>
                <Button.Outline
                  appearance="secondary"
                  className="gap-1 px-2 py-7 justify-between ml-4 "
                  onClick={() => setOpenAsset(true)}
                  disabled={!sourceChain || !destinationChain}
                >
                  <div className="flex items-center gap-2">
                    {selectedAsset ? (
                      <Token
                        name={selectedAsset.ticker}
                        size="md"
                        appearance={selectedAsset.ticker as TokenAppearance}
                        className="rounded-full border border-primary"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-level-5" />
                    )}

                    <Typography.Text size="md">
                      {selectedAsset ? selectedAsset.ticker : "Select token"}
                    </Typography.Text>
                  </div>
                  <RiArrowDownSLine className="w-4 h-4" />
                </Button.Outline>
              </div>
            </div>
          </div>
        </div>
        <Button.Solid
          disabled={!sourceChain || !destinationChain}
          onClick={onBridge}
        >
          Bridge
        </Button.Solid>
      </div>
    </Fragment>
  );
};
