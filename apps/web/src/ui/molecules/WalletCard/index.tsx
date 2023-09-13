import { Icons } from "@polkadex/orderbook-ui/atoms";

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
        <p>
          {walletName} <span>{walletAddress}</span>
        </p>
      </S.Footer>
    </S.Wrapper>
  );
};
