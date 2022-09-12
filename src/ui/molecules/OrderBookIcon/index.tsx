import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export type OrderBookProps = {
  icon: string;
  filterState?: string;
  handleChange: (name: string) => void;
  active?: boolean;
};
export const OrderBookIcon = ({ icon, filterState, handleChange }: OrderBookProps) => {
  const IconComponent = Icons[icon];

  return (
    <S.Wrapper active={filterState === icon} onClick={() => handleChange(icon)}>
      <IconComponent />
    </S.Wrapper>
  );
};
