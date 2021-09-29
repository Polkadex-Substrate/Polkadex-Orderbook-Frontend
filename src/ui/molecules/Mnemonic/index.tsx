import { useRef } from "react";
import { Field } from "formik";

import * as S from "./styles";
import { MnemonicExportProps, MnemonicProps, MnemonicSelectProps } from "./types";

// Transform component to tags
export const MnemonicImport = ({ label, handleChange, ...props }: MnemonicProps) => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Paste from clipboard");
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={props.name}>{label}</label>
        <button type="button" onClick={handleChange}>
          Generate new seed
        </button>
      </S.MnemonicContainer>

      <Field {...props} />
    </S.Wrapper>
  );
};

export const MnemonicExport = ({ label, phrases, handleChange }: MnemonicExportProps) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy from clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phrases.join(" "));
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={label}>{label}</label>
        <button type="button" onClick={handleChange}>
          Import wallet
        </button>
      </S.MnemonicContainer>
      <S.TagsContainer>
        {phrases && phrases.map((item, index) => <S.Tag key={index}>{item}</S.Tag>)}
      </S.TagsContainer>
      <S.MnemonicAction
        type="button"
        ref={buttonRef}
        onMouseOut={handleOnMouseOut}
        onClick={handleCopy}>
        <span>Copy to clipboard</span>
      </S.MnemonicAction>
    </S.Wrapper>
  );
};

export const MnemonicSelect = ({ handleImport, handleExport }: MnemonicSelectProps) => {
  return (
    <S.Wrapper>
      <S.MnemonicSelect>
        <button type="button" onClick={handleImport}>
          Import Wallet
        </button>
        <span>or</span>
        <button type="button" onClick={handleExport}>
          Generate Wallet
        </button>
      </S.MnemonicSelect>
    </S.Wrapper>
  );
};
