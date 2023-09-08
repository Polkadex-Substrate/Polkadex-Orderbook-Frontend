import * as React from "react";

function SvgPlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 18"
      {...props}>
      <path
        d="M13.1579 5.60503C15.614 7.1139 15.614 10.8861 13.1579 12.395L6.52631 16.4689C4.07017 17.9778 1 16.0917 1 13.074L1 4.92602C1 1.90827 4.07018 0.0221756 6.52632 1.53105L13.1579 5.60503Z"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default SvgPlay;
