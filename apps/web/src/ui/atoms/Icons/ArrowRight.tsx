import * as React from "react";

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 14 14"
      {...props}>
      <path d="M5 3L9 7L5 11" fill="none" strokeWidth="2" />
    </svg>
  );
}

export default SvgArrowRight;
