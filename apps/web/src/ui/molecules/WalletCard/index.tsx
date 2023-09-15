import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PropsWithChildren } from "react";

import { Skeleton } from "../Skeleton";

import * as S from "./styles";

export const WalletCard = ({
  label,
  walletTypeLabel,
  walletType,
  walletName,
  walletAddress,
  searchable,
  children,
}: PropsWithChildren<{
  label: string;
  walletTypeLabel: string;
  walletType: string;
  walletName: string;
  searchable?: boolean;
  walletAddress?: string;
}>) => {
  return (
    <S.Wrapper>
      <S.Header>
        <small>{label}</small>
        {searchable && children ? (
          children
        ) : (
          <S.Paragraph>
            {walletType} <span>({walletTypeLabel})</span>
          </S.Paragraph>
        )}
      </S.Header>
      {!searchable && (
        <S.Footer>
          <Skeleton height="4px" width="5rem" loading={!walletName}>
            {walletAddress ? (
              <>
                <S.Icon>
                  <Icons.Wallet />
                </S.Icon>
                <Skeleton height="4px" width="5rem" loading={!walletAddress}>
                  <p>
                    {walletName} <span>• {walletAddress}</span>
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
      )}
    </S.Wrapper>
  );
};
