import { Icons } from "@polkadex/orderbook-ui/atoms";

import { Skeleton } from "../Skeleton";

import * as S from "./styles";

export const WalletCard = ({
  label,
  walletTypeLabel,
  walletType,
  walletName,
  walletAddress,
}: {
  label: string;
  walletTypeLabel: string;
  walletType: string;
  walletName: string;
  walletAddress?: string;
}) => {
  return (
    <S.Wrapper>
      <S.Header>
        <small>{label}</small>
        <p>
          {walletType} <span>({walletTypeLabel})</span>
        </p>
      </S.Header>
      <S.Footer>
        <Skeleton height="4px" width="5rem" loading={!walletName}>
          {walletAddress ? (
            <>
              <S.Icon>
                <Icons.Wallet />
              </S.Icon>
              <Skeleton height="4px" width="5rem" loading={!walletAddress}>
                <p>
                  {walletName} <span>{walletAddress}</span>
                </p>
              </Skeleton>
            </>
          ) : (
            <S.Message>
              <div>
                <Icons.InformationAlert />
              </div>
              <p>{walletName}</p>
            </S.Message>
          )}
        </Skeleton>
      </S.Footer>
    </S.Wrapper>
  );
};
