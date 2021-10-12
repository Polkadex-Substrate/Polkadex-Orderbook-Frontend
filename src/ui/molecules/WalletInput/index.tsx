import { InputHTMLAttributes, useRef } from "react";

import * as S from "./styles";

export const WalletInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.value as string);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Wrapper>
      <input type="text" disabled {...props} />
      <button ref={buttonRef} type="button" onMouseOut={handleOnMouseOut} onClick={handleCopy}>
        Copy
      </button>
    </S.Wrapper>
  );
};
