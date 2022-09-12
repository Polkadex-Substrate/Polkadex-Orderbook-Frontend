import * as S from "./styles";

export type LinkProps = {
  title: string;
  href?: string;
  color?: string;
  size?: "Small" | "Medium" | "Large";
};
const Link = ({ title = "Example", href = "#", color }: LinkProps) => (
  <S.Wrapper href={href} color={color}>
    {title}
  </S.Wrapper>
);

export default Link;
