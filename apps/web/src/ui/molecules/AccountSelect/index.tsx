import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Combobox } from "@headlessui/react";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { transformAddress } from "@orderbook/core/providers/user/profile";

import { Skeleton } from "../Skeleton";
import { ResultFound } from "../ResultFound";

import * as S from "./styles";

import { CustomAddress } from "@/ui/organisms/TransferFormWithdraw/types";

export const AccountSelect = ({
  selectedAccount,
  onQuery,
  onSelectAccount,
  loading,
  data,
}: {
  selectedAccount?: ExtensionAccount | CustomAddress;
  onSelectAccount: (e: ExtensionAccount) => void;
  onQuery: (e: string) => void;
  loading: boolean;
  data: ExtensionAccount[] | CustomAddress[];
}) => {
  const handleOnPaste = async () => {
    const pastedData = await navigator.clipboard.readText();
    onQuery(pastedData);
  };

  return (
    <Combobox nullable value={selectedAccount} onChange={onSelectAccount}>
      <Combobox.Button>
        {({ open }) => (
          <S.Wrapper>
            <Skeleton height="4px" width="5rem" loading={false}>
              <S.Container>
                <S.Icon>
                  <Icons.Wallet />
                </S.Icon>
                <Skeleton height="4px" width="5rem" loading={loading}>
                  <Combobox.Input
                    displayValue={(e: ExtensionAccount | CustomAddress) => {
                      const addressName = e?.account?.meta?.name;
                      const address = addressName
                        ? transformAddress(e?.account?.address)
                        : e?.account?.address;

                      return addressName && address
                        ? `${addressName} • (${address})`
                        : address;
                    }}
                    placeholder="Enter or select a Polkadex address"
                    onChange={(event) => onQuery(event.target.value)}
                  />
                </Skeleton>
              </S.Container>
              <S.Actions>
                <button type="button" onClick={handleOnPaste}>
                  Paste
                </button>
                <S.Arrow open={open}>
                  <Icons.ArrowBottom />
                </S.Arrow>
              </S.Actions>
            </Skeleton>
          </S.Wrapper>
        )}
      </Combobox.Button>
      <S.OptionsWrapper>
        <S.OptionsContainer>
          <small>Accounts</small>
          <S.OptionsItemsWrapper>
            {data?.length ? (
              data.map((e) => {
                const name = e?.account?.meta?.name;
                const address = transformAddress(e?.account?.address ?? "");

                return (
                  <S.OptionsItem key={e.account.address} value={e}>
                    <div>
                      <Icons.Avatar />
                    </div>
                    <p>
                      {name ?? "Custom Address"} <span>{address}</span>
                    </p>
                  </S.OptionsItem>
                );
              })
            ) : (
              <ResultFound />
            )}
          </S.OptionsItemsWrapper>
        </S.OptionsContainer>
      </S.OptionsWrapper>
    </Combobox>
  );
};
