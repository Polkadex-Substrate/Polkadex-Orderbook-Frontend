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
  walletAddress: string;
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
        <div>
          <Icons.Wallet />
        </div>
        {walletAddress ? (
          <p>
            {walletName} <span>{walletAddress}</span>
          </p>
        ) : (
          <Skeleton height="4px" width="5rem" />
        )}
      </S.Footer>
    </S.Wrapper>
  );
};
