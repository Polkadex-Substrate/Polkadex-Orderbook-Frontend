import * as S from "./styles";

export type ListItemProps = {
  title?: string;
  size?: "Small" | "Medium" | "Large";
  fullWidth?: boolean;
  isActive?: boolean;
};

const ListItemButton = ({
  title,
  size = "Medium",
  fullWidth = false,
  isActive = false,
}: ListItemProps) => (
  <S.Wrapper isActive={isActive} size={size} fullWidth={fullWidth}>
    {title}
  </S.Wrapper>
);

export default ListItemButton;
