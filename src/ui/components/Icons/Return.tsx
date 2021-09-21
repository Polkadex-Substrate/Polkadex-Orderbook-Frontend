import * as React from "react";

function SvgReturn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 23"
      {...props}
    >
      <g transform="rotate(90 12.011 11.989)">
        <rect
          data-name="Rectangle 2"
          width={23}
          height={24}
          rx={7}
          transform="translate(.023)"
          fill="#2e303c"
        />
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

export default SvgReturn;
