import { Icon } from "..";

import * as S from "./styles";
export const NotificationCard = ({
  title = "Example",
  description = "Description",
  onClose,
}) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Aside>
          <span>{title}</span>
          <p>{description}</p>
        </S.Aside>
        <Icon name="Close" onClick={onClose} style={{ cursor: "pointer", width: "1rem" }} />
      </S.Container>
    </S.Wrapper>
  );
};
