import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PropsWithChildren } from "react";

import { Skeleton } from "../Skeleton";

import * as S from "./styles";

export const WalletCard = ({
  label,
  walletType,
  walletName,
  walletAddress,
  searchable,
  children,
}: PropsWithChildren<{
  label: string;
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
          <S.Paragraph>{walletType}</S.Paragraph>
        )}
      </S.Header>
      <S.Footer>
        <Skeleton height="4px" width="5rem" loading={!walletName}>
          {walletAddress && (
            <>
              <S.Icon>
                <Icons.Wallet />
              </S.Icon>
              <Skeleton height="4px" width="5rem" loading={!walletAddress}>
                {searchable ? (
                  <span>{walletAddress}</span>
                ) : (
                  <p>
                    {walletName} <span>• {walletAddress}</span>
                  </p>
                )}
              </Skeleton>
            </>
          )}
          {!searchable && !walletAddress && (
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