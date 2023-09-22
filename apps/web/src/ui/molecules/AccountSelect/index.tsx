import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Combobox } from "@headlessui/react";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { transformAddress } from "@orderbook/core/providers/user/profile";

import { Skeleton } from "../Skeleton";
import { ResultFound } from "../ResultFound";
import { Popover } from "../Popover";

import * as S from "./styles";

import { CustomAddress } from "@/ui/organisms/TransferFormWithdraw/types";

export const AccountSelect = ({
  selectedAccount,
  onQuery,
  onSelectAccount,
  loading = false,
  pasteable = true,
  placeholder = "Enter or select a Polkadex address",
  inValidMessage = "Invalid address",
  isValidAddress = true,
  data,
}: {
  selectedAccount?: ExtensionAccount | CustomAddress | null;
  onSelectAccount: (e: ExtensionAccount) => void;
  onQuery: (e: string) => void;
  loading?: boolean;
  pasteable?: boolean;
  data: ExtensionAccount[] | CustomAddress[];
  placeholder?: string;
  inValidMessage?: string;
  isValidAddress?: boolean;
}) => {
  const handleOnPaste = async () => {
    const pastedData = await navigator.clipboard.readText();
    onQuery(pastedData);
  };

  return (
    <Combobox nullable value={selectedAccount} onChange={onSelectAccount}>
      <S.Main style={{ position: "relative" }}>
        <Combobox.Button>
          {({ open }) => (
            <S.Wrapper>
              <Skeleton height="4px" width="5rem" loading={loading}>
                <S.Container>
                  <Skeleton height="4px" width="5rem" loading={loading}>
                    <Popover
                      placement="top left"
                      isOpen={!!selectedAccount && !isValidAddress}
                    >
                      <Popover.Trigger>
                        <div />
                      </Popover.Trigger>
                      <Popover.Content>
                        <S.Errors>
                          <div>
                            <Icons.Alert />
                          </div>
                          <p>{inValidMessage}</p>
                        </S.Errors>
                      </Popover.Content>
                    </Popover>
                    <Combobox.Input
                      displayValue={(e: ExtensionAccount | CustomAddress) => {
                        const addressName = e?.account?.meta?.name;
                        const address = addressName
                          ? transformAddress(e?.account?.address)
                          : e?.account?.address;

                        return addressName ?? address;
                      }}
                      placeholder={placeholder}
                      onChange={(event) => onQuery(event.target.value)}
                    />
                  </Skeleton>
                </S.Container>
                <S.Actions>
                  {pasteable && (
                    <button type="button" onClick={handleOnPaste}>
                      Paste
                    </button>
                  )}
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
      </S.Main>
    </Combobox>
  );
};
