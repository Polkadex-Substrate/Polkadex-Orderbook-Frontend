import * as React from "react";

function SvgLoan(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9057 6.95286C11.9057 9.68844 9.68844 11.9057 6.95286 11.9057C4.21727 11.9057 2 9.68844 2 6.95286C2 4.21727 4.21727 2 6.95286 2C9.68844 2 11.9057 4.21727 11.9057 6.95286Z"
        strokeWidth="2.26666"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0004 14.0473C19.0004 16.7829 16.7832 19.0002 14.0476 19.0002C11.312 19.0002 9.09473 16.7829 9.09473 14.0473C9.09473 11.3118 11.312 9.09448 14.0476 9.09448C16.7832 9.09448 19.0004 11.3118 19.0004 14.0473Z"
        strokeWidth="2.26666"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default SvgLoan;
