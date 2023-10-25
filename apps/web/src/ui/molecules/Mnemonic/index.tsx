import { useRef } from "react";
import { detect } from "detect-browser";
import { useTranslation } from "next-i18next";
import { noop } from "@orderbook/core/helpers/noop";

import * as S from "./styles";
import { MnemonicProps } from "./types";

// Transform component to tags
export const MnemonicImport = ({
  label,
  state,
  handleChange,
  ...props
}: MnemonicProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const browser = detect();
  const isBrowserSupported =
    browser && ["chrome", "opera", "edge", "safari"].indexOf(browser.name) > 0;

  const handleOnMouseOut = async () => {
    const phrase = await navigator.clipboard.readText();
    const val: string[] = phrase
      .split(" ")
      .map((value) => value.trim())
      .filter((e) => e);

    if (
      val.length &&
      val.length <= 12 &&
      val.length + state.tags.length <= 12
    ) {
      handleChange({ tags: [...state.tags, ...val] });
      inputRef?.current ? (inputRef.current.value = "") : noop();
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
      inputRef?.current ? (inputRef.current.value = "") : noop();
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
          onClick={isBrowserSupported ? handleOnMouseOut : undefined}
        >
          <span>
            {isBrowserSupported && t("clickToPaste")} {t("message")}
          </span>
        </S.MnemonicAction>
      </S.MnemonicImport>
    </S.Wrapper>
  );
};
