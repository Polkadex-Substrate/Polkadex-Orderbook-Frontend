import { useRef } from "react";

import * as S from "./styles";
import { Props, MnemonicExportProps, MnemonicProps } from "./types";
export const Input = ({ label, ...props }: Props) => (
  <S.Wrapper>
    <label htmlFor={props.name}>
      {label}
      <input {...props} />
    </label>
  </S.Wrapper>
);

// Transform component to tags
export const MnemonicImport = ({ label, onChange, ...props }: MnemonicProps) => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText(); // Not works Mozilla - get permissions
    inputRef.current.value = text;
    buttonRef.current.innerHTML = "Pasted";
  };

  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Paste from clipboard");
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={props.name}>{label}</label>
        <button type="button" onClick={onChange}>
          Generate new seed
        </button>
      </S.MnemonicContainer>

      <input ref={inputRef} {...props} />
      <S.MnemonicAction ref={buttonRef} onMouseOut={handleOnMouseOut} onClick={handlePaste}>
        <span>Paste from clipboard</span>
      </S.MnemonicAction>
    </S.Wrapper>
  );
};

export const MnemonicExport = ({ label, phrases, onChange }: MnemonicExportProps) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy from clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phrases.toString());
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={label}>{label}</label>
        <button type="button" onClick={onChange}>
          Import wallet
        </button>
      </S.MnemonicContainer>
      <S.TagsContainer>
        {phrases && phrases.map((item, index) => <S.Tag key={index}>{item}</S.Tag>)}
      </S.TagsContainer>
      <S.MnemonicAction ref={buttonRef} onMouseOut={handleOnMouseOut} onClick={handleCopy}>
        <span>Copy to clipboard</span>
      </S.MnemonicAction>
    </S.Wrapper>
  );
};
