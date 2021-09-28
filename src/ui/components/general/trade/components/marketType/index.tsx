import DropdownHeader from "../../../../global/dropdownHeader";
import MarketTypeContentItem from "../marketTypeContent";

import * as S from "./styles";

import { Dropdown } from "src/ui/components";

const MarketType = () => (
  <S.Wrapper>
    <Dropdown direction="left" title={<DropdownHeader title="Market Order" />}>
      <MarketTypeContentItem />
    </Dropdown>
  </S.Wrapper>
);

export default MarketType;
