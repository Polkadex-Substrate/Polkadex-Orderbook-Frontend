import { SVGProps } from "react";

import * as S from "./styles";
export const Selected = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 10"
      {...props}>
      <S.Selected
        d="M0.507812 5.55382L3.78474 8.87689L11.4924 1.12305"
        stroke-width="1.38462"
        fill="none"
      />
    </svg>
  );
};
