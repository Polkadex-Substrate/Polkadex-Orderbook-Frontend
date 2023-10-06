import { useTranslation } from "react-i18next";

import { Icon, LoadingSpinner } from "../";

import * as S from "./styles";
import * as T from "./types";

export const Button = ({
  isFull = false,
  icon,
  background = "text",
  color = "inverse",
  children,
  size = "medium",
  hoverColor = "primary",
  isLoading = false,
  ...props
}: T.Props) => {
  const { t } = useTranslation("molecules");

  return (
    <S.Wrapper
      size={size}
      background={background}
      color={color}
      isFull={isFull}
      hasIcon={!!icon}
      isDisabled={props.disabled}
      hoverColor={hoverColor}
      isLoading={isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner color="white" style={{ marginRight: "0.5rem" }} />
      ) : (
        !!icon && <Icon {...icon} />
      )}
      {isLoading ? <p>{t("button.loading")}</p> : children}
    </S.Wrapper>
  );
};
