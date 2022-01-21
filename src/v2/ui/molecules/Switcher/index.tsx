import { useState } from "react";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Switcher = ({
  title = "Title",
  description = "Description",
  icon = "Appearance",
}) => {
  return (
    <S.Main>
      <S.Header>
        <Icon name={icon} size="medium" color="inverse" />
        <div>
          <span>{title}</span>
          <p>{description}</p>
        </div>
      </S.Header>
      <Switch />
    </S.Main>
  );
};

const Switch = () => {
  const [active, setActive] = useState(false);

  return (
    <S.Switch isActive={active} onClick={() => setActive(!active)}>
      <div />
    </S.Switch>
  );
};
