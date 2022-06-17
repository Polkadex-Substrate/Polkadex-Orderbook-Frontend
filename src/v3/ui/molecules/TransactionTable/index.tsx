import TransactionOrder from "../TransactionOrder";

import * as S from "./styles";

type Props = {
  data?: any;
  remove?: (id: string) => void;
  filters?: {
    hiddenPairs: boolean;
    onlyBuy: boolean;
    onlySell: boolean;
    status: string;
  };
};

const TransactionTable = ({ data, remove, filters }: Props) => (
  <>
    {data && (
      <S.Wrapper>
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Date</S.Th>
              <S.Th>Pair</S.Th>
              <S.Th>Side</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Fee</S.Th>
              <S.Th>Total</S.Th>
              <S.Th></S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {data &&
              data.map((item) => (
                <TransactionOrder key={item.id} data={item} remove={() => remove(item.id)} />
              ))}
          </S.Tbody>
        </S.Table>
      </S.Wrapper>
    )}
  </>
);

export default TransactionTable;
