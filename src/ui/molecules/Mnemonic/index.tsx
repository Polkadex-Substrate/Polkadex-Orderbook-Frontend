import { useRef } from "react";
import { detect } from "detect-browser";
import { useTranslation } from "react-i18next";

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

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`mnemonic.${key}`);

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
              placeholder={t("placeholder")}
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
            {isBrowserSupported && t("clickToPaste")} {t("message")}
          </span>
        </S.MnemonicAction>
      </S.MnemonicImport>
    </S.Wrapper>
  );
};

export const MnemonicExport = ({ label, phrases }: MnemonicExportProps) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`mnemonic.${key}`);

  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = t("copyToClipboard"));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(phrases.join(" "));
    buttonRef.current.innerHTML = t("copied");
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
        <span>{t("copyToClipboard")}</span>
      </S.MnemonicAction>
    </S.Wrapper>
  );
};
