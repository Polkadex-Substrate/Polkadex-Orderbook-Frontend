import { Icons } from "@polkadex/orderbook-ui/atoms";
import { PropsWithChildren } from "react";

import { Skeleton } from "../Skeleton";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

export const WalletCard = ({
  label,
  walletType,
  walletName,
  walletAddress,
  searchable,
  children,
  hasUser,
}: PropsWithChildren<{
  label: string;
  walletType: string;
  walletName: string;
  searchable?: boolean;
  walletAddress?: string;
  hasUser?: boolean;
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
      {hasUser && (
        <S.Footer>
          {walletAddress && (
            <>
              <S.Icon>
                <Icons.Wallet />
              </S.Icon>
              <Skeleton
                height="4px"
                width={normalizeValue(5)}
                loading={!walletAddress}
              >
                {searchable ? (
                  <span>{walletAddress}</span>
                ) : (
                  <p>
                    {walletName}
                    <span>
                      {walletName && " • "}
                      {walletAddress}
                    </span>
                  </p>
                )}
              </Skeleton>
            </>
          )}
          {!searchable && !walletAddress && walletName && (
            <S.Message>
              <div>
                <Icons.InformationAlert />
              </div>
              <p>{walletName}</p>
            </S.Message>
          )}{" "}
        </S.Footer>
      )}
    </S.Wrapper>
  );
};
