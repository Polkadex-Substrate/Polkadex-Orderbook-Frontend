import Heading from "../../molecules/Heading";
import SearchInput from "../../molecules/SearchInput";
import MarketTable from "../../molecules/MarketTable";

import * as S from "./styles";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useMarkets } from "@polkadex/orderbook/hooks";

const Market = () => {
  const {
    marketTokens,
    marketTickers,
    handleChangeMarket,
    handleFieldChange,
    handleMarketsTabsSelected,
    currentTickerImg,
    currentTickerName,
  } = useMarkets();
  return (
    <S.Section>
      <S.Header>
        <Heading title="Market" />
        <Dropdown title="Pair | USD">
          <p>...</p>
        </Dropdown>
      </S.Header>
      <S.WrapperActions>
        <SearchInput placeholder="Search.." type="search" />
        <S.ContainerActions>
          <Icon name="Settings" background="secondaryBackground" />
          <Icon name="Star" background="none" />
        </S.ContainerActions>
      </S.WrapperActions>
      <S.WrapperTokens>
        <MarketTable />
      </S.WrapperTokens>
    </S.Section>
  );
};

export default Market;
