import * as React from "react";

function SvgWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 23"
      {...props}>
      <path
        d="M21 11.5V16.5C21 19.5 19 21.5 16 21.5H6C3 21.5 1 19.5 1 16.5V11.5C1 8.78 2.64 6.88 5.19 6.56C5.45 6.52 5.72 6.5 6 6.5H16C16.26 6.5 16.51 6.50999 16.75 6.54999C19.33 6.84999 21 8.76 21 11.5Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7514 6.55C16.5114 6.51 16.2614 6.50001 16.0014 6.50001H6.00141C5.72141 6.50001 5.45141 6.52001 5.19141 6.56001C5.33141 6.28001 5.53141 6.02001 5.77141 5.78001L9.02141 2.52C10.3914 1.16 12.6114 1.16 13.9814 2.52L15.7314 4.29002C16.3714 4.92002 16.7114 5.72 16.7514 6.55Z"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12H18C16.9 12 16 12.9 16 14C16 15.1 16.9 16 18 16H21"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgWallet;
