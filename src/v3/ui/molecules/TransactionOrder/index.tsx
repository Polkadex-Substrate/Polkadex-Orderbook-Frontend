import moment from "moment";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

type Props = {
  data?: any;
  remove?: () => void;
};

const TransactionOrder = ({ data, remove }: Props) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Date</S.Tag>
      <S.ContainerFlex>
        {data.status ? (
          <>
            <S.Image src="/img/icons/Clock.svg" />
            <span>Pending</span>
          </>
        ) : (
          moment(data.date).format("LLL")
        )}
      </S.ContainerFlex>
    </S.Td>

    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <S.Image src={`img/cryptocurrencies/${data.coin}.svg`} />
        <span>
          {data.coin} / {data.pair}
        </span>
      </S.ContainerFlex>
    </S.Td>

    <S.Td>
      <S.Tag>Side</S.Tag>
      <S.ContainerFlex>
        <S.Image src={`img/icons/${data.side}.svg`} />
        <span>{data.side}</span>
      </S.ContainerFlex>
    </S.Td>

    <S.Td>
      <S.Tag>Side</S.Tag>
      <span>{data.price}</span>
    </S.Td>

    <S.Td>
      <S.Tag>Side</S.Tag>
      <span>
        {data.fee} {data.coin}
      </span>
    </S.Td>

    <S.Td>
      <S.Tag>Side</S.Tag>
      <span>
        {data.total} {data.pair}
      </span>
    </S.Td>

    <S.Td>
      <S.Tag>Actions</S.Tag>
      <S.ContainerActions>
        {data.status && <Icon name="Close" background="primary" onClick={remove} />}
        <Icon name="Options" background="none" />
      </S.ContainerActions>
    </S.Td>
  </S.Tr>
);

export default TransactionOrder;
