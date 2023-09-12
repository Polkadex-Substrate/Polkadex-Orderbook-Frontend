import { Icon } from "@polkadex/orderbook-ui/molecules";
import { noop } from "@orderbook/core/helpers/noop";

import * as S from "./styles";

export const Switcher = ({
  title = "Title",
  description = "Description",
  icon = "Appearance",
  isActive = false,
  onChange = noop,
}) => {
  return (
    <S.Main>
      <S.Header>
        <Icon name={icon} size="medium" color="text" stroke="text" />
        <div>
          <span>{title}</span>
          <p>{description}</p>
        </div>
      </S.Header>
      <Switch isActive={isActive} onChange={onChange} />
    </S.Main>
  );
};

export const Switch = ({ isActive = false, onChange = noop }) => {
  return (
    <S.Switch isActive={isActive} onClick={onChange}>
      <div />
    </S.Switch>
  );
};
