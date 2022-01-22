import * as React from "react";

function SvgExchange(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 13 12"
      {...props}>
      <path
        d="M1.2793 4.56818H11.7793L7.39962 0.75"
        stroke="black"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7793 7.43182L1.2793 7.43182L5.65898 11.25"
        stroke="black"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgExchange;
