import { useRef } from "react";
import { detect } from "detect-browser";

import * as S from "./styles";
import { MnemonicExportProps, MnemonicProps } from "./types";

// Transform component to tags
export const MnemonicImport = ({ label, state, handleChange, ...props }: MnemonicProps) => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const { name } = detect();
  const isBrowserSupported = ["chrome", "opera", "edge", "safari"].indexOf(name) > 0;

  const handleOnMouseOut = async () => {
    const phrase = await navigator.clipboard.readText();
    const val: string[] = phrase
      .split(" ")
      .map((value) => value.trim())
      .filter((e) => e);

    if (val.length && val.length <= 12 && val.length + state.tags.length <= 12) {
      handleChange({ tags: [...state.tags, ...val] });
      inputRef.current.value = null;
    }
  };

  const onInputKeyDown = (e) => {
    const val: string[] = e.target.value
      .split(" ")
      .map((value) => value.trim())
      .filter((e) => e);

    if (
      !!val.length &&
      val.length <= 12 &&
      val.length + state.tags.length <= 12 &&
      e.key === "Enter"
    ) {
      handleChange({ tags: [...state.tags, ...val] });
      inputRef.current.value = null;
    } else if (e.key === "Backspace" && e.target.value.length === 0) {
      handleRemove(state.tags.length - 1);
    }
  };

  const handleRemove = (i: number) => {
    const newTags = [...state.tags];
    newTags.splice(i, 1);
    handleChange({ tags: newTags });
  };

  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={props.name}>{label}</label>
      </S.MnemonicContainer>
      <S.MnemonicImport hasTag={!!state.tags.length}>
        <ul>
          {state.tags &&
            state.tags.map((item, index) => (
              <S.MnemonicListItem key={index}>
                <button onClick={() => handleRemove(index)} type="button">
                  {item}
                </button>
              </S.MnemonicListItem>
            ))}
          <li>
            <input
              ref={inputRef}
              placeholder="Type mnemonic to restore your proxy account in this browser"
              disabled={state.tags.length >= 12}
              onKeyDown={onInputKeyDown}
            />
          </li>
        </ul>

        <S.MnemonicAction
          type="button"
          ref={buttonRef}
          onClick={isBrowserSupported ? handleOnMouseOut : undefined}>
          <span>
            {isBrowserSupported && "Click to paste from the clipboard or"} type each word from
            the seed phrase and press enter.
          </span>
        </S.MnemonicAction>
      </S.MnemonicImport>
    </S.Wrapper>
  );
};

export const MnemonicExport = ({ label, phrases }: MnemonicExportProps) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phrases.join(" "));
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Wrapper>
      <S.MnemonicContainer>
        <label htmlFor={label}>{label}</label>
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
