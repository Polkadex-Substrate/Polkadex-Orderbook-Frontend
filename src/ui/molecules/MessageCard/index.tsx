import * as S from "./styles";
import { Props } from "./types";

import { Colors } from "@polkadex/web-helpers";
import { Icon } from "@polkadex/orderbook-ui/molecules";
import { AlertTypes } from "@polkadex/orderbook-modules";

export const MessageCard = ({ icon, title, description }: Props) => {
  const color = getColor(icon as AlertTypes);
  return (
    <S.Wrapper>
      <Icon name={icon} size="large" background={color} />
      <h3>{title}</h3>
      <p>{description}</p>
    </S.Wrapper>
  );
};

function getColor(messageType: AlertTypes): Colors {
  switch (messageType) {
    case "Error":
      return "primary";

    case "Attention":
      return "orange";

    case "Successful":
      return "green";

    case "Loading":
      return "secondaryBackground";

    default:
      return "secondaryBackground";
  }
}
