import { FormEvent, useRef, useState } from "react";
import { Field } from "formik";

import * as S from "./styles";
import { MnemonicExportProps, MnemonicProps, MnemonicSelectProps } from "./types";

// Transform component to tags
export const MnemonicImport = ({ label, handleChange, ...props }: MnemonicProps) => {
  const [state, setState] = useState({ tags: [] });

  const inputRef = useRef(null);
  // const buttonRef = useRef(null);

  // const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Paste from clipboard");
  const onInputKeyDown = (e) => {
    const val = e.target.value;
    const sameValue = state.tags.find((tag) => tag.toLowerCase() === val.toLowerCase());
    const hasSpace = /\s/.test(val);
    if (val && e.key === "Enter") {
      if (sameValue || hasSpace) {
        return;
      }
      setState({ tags: [...state.tags, val] });
      inputRef.current.value = null;
    } else if (e.key === "Backspace" && !val) {
      handleRemove(state.tags.length - 1);
    }
  };
  const handleRemove = (i: number) => {
    const newTags = [...state.tags];
    newTags.splice(i, 1);
    setState({ tags: newTags });
  };

  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={props.name}>{label}</label>
        <button type="button" onClick={handleChange}>
          Generate new seed
        </button>
      </S.MnemonicContainer>
      <S.MnemonicImport>
        <ul>
          {state.tags &&
            state.tags.map((item, index) => (
              <S.MnemonicListItem key={index}>
                <button onClick={() => handleRemove(index)} type="button">
                  {item}
                </button>
              </S.MnemonicListItem>
            ))}

          <li className="input-tag__tags__input">
            <input ref={inputRef} type="text" placeholder="tag" onKeyDown={onInputKeyDown} />
          </li>
        </ul>
      </S.MnemonicImport>

      {/* <Field {...props} /> */}
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
          Generate a Proxy Account
        </button>
      </S.MnemonicSelect>
    </S.Wrapper>
  );
};
