import * as S from "./styles";
import Props from "./types";

import { Dropdown } from "src/ui/molecules";

const TradeFees = ({ label = "Label", value = "0.00005" }: Props) => {
  return (
    <S.Wrapper>
      <span>{label}</span>
      <Dropdown title={`${label}: ${value}`}>
        <p>Example</p>
        <p>Example</p>
      </Dropdown>
    </S.Wrapper>
  );
};

export default TradeFees;
