import * as React from "react";

function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 23"
      {...props}
    >
      <g transform="rotate(90 12.011 11.989)">
        <path
          data-name="Path 6"
          d="M14.747 10.403l-3.325 3.325-3.325-3.325"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
}

export default SvgArrowLeft;
