import * as S from "./styles";

export type InputProps = {
  label?: string;
  icon?: "None" | "ArrowVerticalBottom" | "ArrowVerticalTop";
  placeholder?: string;
  type?: "text" | "email" | "password" | "url" | "number";
  value?: number;
  inputInfo?: string;
  fullWidth?: boolean;
};

const Input = ({
  label = "Label",
  placeholder = "Text..",
  type = "text",
  icon = "None",
  inputInfo,
  fullWidth = false,
}: InputProps) => {
  return (
    <S.Wrapper>
      <S.ContainerInput>
        <S.Label>
          {icon !== "None" && <img src={`/img/icons/${icon}.svg`} />} {label}
        </S.Label>
        <S.Box inputInfo={inputInfo} fullWidth={fullWidth}>
          <S.Input
            placeholder={placeholder}
            type={type}
            onChange={(e) => console.log(e.target.value)}
          />
          {inputInfo && <S.Span>{inputInfo}</S.Span>}
        </S.Box>
      </S.ContainerInput>
    </S.Wrapper>
  );
};

export default Input;
