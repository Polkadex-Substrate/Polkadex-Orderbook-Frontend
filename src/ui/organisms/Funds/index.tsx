import * as S from "./styles";

import { useFunds } from "@polkadex/orderbook/hooks";
import { EmptyData, FundsCard } from "@polkadex/orderbook-ui/molecules";

export const Funds = () => {
  const { balances } = useFunds();

  return (
    <S.Wrapper>
      {balances.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Token</S.Th>
              <S.Th>Available</S.Th>
              <S.Th>Locked</S.Th>
              <S.Th>Reserved for withdraw</S.Th>
              <S.Th>Actions</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {balances.map((balance, i) => {
              return (
                <FundsCard
                  key={i}
                  name={balance.name}
                  ticker={balance.symbol}
                  amount={Number(balance.free_balance) || 0}
                  lockedAmount={Number(balance.reserved_balance) || 0}
                  id={balance.symbol}
                />
              );
            })}
          </S.Tbody>
        </S.Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
