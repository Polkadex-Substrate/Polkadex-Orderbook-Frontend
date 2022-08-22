import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Switcher = ({
  title = "Title",
  description = "Description",
  icon = "Appearance",
  isActive = false,
  onChange = undefined,
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

const Switch = ({ isActive = false, onChange = undefined }) => {
  return (
    <S.Switch isActive={isActive} onClick={onChange}>
      <div />
    </S.Switch>
  );
};
