import * as S from "./styles";

export type ButtonProps = {
  title: string;
  size?: "Small" | "Medium" | "Large";
  darkMode?: boolean;
  fullWidth?: boolean;
  type?: "submit" | "button";
};

const Button = ({
  title = "Button",
  size = "Medium",
  darkMode = true,
  fullWidth = false,
  type = "button",
}: ButtonProps) => (
  <S.Wrapper type={type} size={size} darkMode={darkMode} fullWidth={fullWidth}>
    {title}
  </S.Wrapper>
);

export default Button;
