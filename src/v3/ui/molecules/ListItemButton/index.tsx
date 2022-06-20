import * as S from "./styles";

export type ListItemProps = {
  title?: string;
  size?: "Small" | "Medium" | "Large";
  darkMode?: boolean;
  fullWidth?: boolean;
  isActive?: boolean;
};

const ListItemButton = ({
  title,
  size = "Medium",
  darkMode = true,
  fullWidth = false,
  isActive = false,
}: ListItemProps) => (
  <S.Wrapper isActive={isActive} size={size} darkMode={darkMode} fullWidth={fullWidth}>
    {title}
  </S.Wrapper>
);

export default ListItemButton;
