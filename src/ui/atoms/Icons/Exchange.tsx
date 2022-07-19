import * as React from "react";

function SvgExchange(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 19 19"
      {...props}>
      <path
        d="M1.62109 7.35227H17.3711L10.8016 1.625"
        fill="none"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3711 11.6477L1.6211 11.6477L8.19061 17.375"
        fill="none"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgExchange;
