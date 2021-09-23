import * as S from "./styles";
import Props from "./types";

import { Input } from "src/ui/components";

const TradeForm = ({
  label = "Label",
  icon = "Wallet",
  amount = 0.0,
  coin = "DEX",
}: Props) => {
  return (
    <S.Wrapper>
      <Input label="Price" />
      <Input label="Amount" />
      <S.Container></S.Container>
    </S.Wrapper>
  );
};

export default TradeForm;
