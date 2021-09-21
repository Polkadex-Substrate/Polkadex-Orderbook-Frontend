import * as S from "./styles";
import Props from "./types";

import Icon from "src/ui/components/global/icon";

const TradeInfo = ({
  label = "Label",
  icon = "Wallet",
  amount = 0.0,
  coin = "DEX",
}: Props) => {
  return (
    <S.Wrapper>
      <Icon name={icon} />
      <div>
        <span>{label}</span>
        <span>
          {amount} {coin}
        </span>
      </div>
    </S.Wrapper>
  );
};

export default TradeInfo;
