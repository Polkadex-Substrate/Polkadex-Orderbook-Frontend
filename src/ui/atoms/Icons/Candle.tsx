import * as React from "react";

export function Candle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 28"
      {...props}>
      <path
        d="M4.3 10.7347H1.86C1.82687 10.7347 1.8 10.7616 1.8 10.7947V14.4898V18.2449V21.94C1.8 21.9731 1.82687 22 1.86 22H4.3M4.3 10.7347H6.74C6.77314 10.7347 6.8 10.7616 6.8 10.7947V14.4898V18.2449V21.94C6.8 21.9731 6.77314 22 6.74 22H4.3M4.3 10.7347V6M4.3 26.7347V22"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.7 6.13472H13.26C13.2269 6.13472 13.2 6.16158 13.2 6.19472V9.88982V13.6449V17.34C13.2 17.3732 13.2269 17.4 13.26 17.4H15.7M15.7 6.13472H18.14C18.1731 6.13472 18.2 6.16158 18.2 6.19472V9.88982V13.6449V17.34C18.2 17.3732 18.1731 17.4 18.14 17.4H15.7M15.7 6.13472V1.40002M15.7 22.1347V17.4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
