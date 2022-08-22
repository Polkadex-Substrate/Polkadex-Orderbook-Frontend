import { SVGProps } from "react";

import * as S from "./styles";
export const Close = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <S.ClosePath
        d="M18 6L6 18M6 6l12 12"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="nextui-modal-close-icon-svg"
        aria-hidden="true"
      />
    </svg>
  );
};
